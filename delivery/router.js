import express from 'express';
import moment from 'moment';
import { authMiddleware, hasPermissions } from '../AuthUtils';
import * as userDAO from '../db/user';
import * as deliveryDAO from './db/delivery';
import LogService from '../lib/logService';
import { hasBotPermission, validBot } from '../middleware/BotUtil';
import * as deliveryService from './service';


const logger = new LogService('chatbot_delivery', 'INFO')
let router = express.Router()


router.get(['', '/'], [authMiddleware(true), validBot, hasBotPermission(true)], async(req, res) => {

    let query = req.query || {}
    let bot = req.bot     

    try{

        let params = {botId: bot.id}
        

        let list = await deliveryDAO.getDeliveryStatus(params)
        
        
        //console.log(list)
        res.status(200).json({code: 1000, message: 'success', list})

    }catch (err) {
        logger.error('get delivery status error', err.message)
        res.status(200).json({code: 1001, message: err.message}) 
    }    
    
})

router.post(['', '/'], [authMiddleware(true), validBot, hasBotPermission(true)], async(req, res) =>{
    console.log(req.body)
    logger.info("balance request post body", req.body); 
    let bot = req.bot
    let name='chatbot-'+req.bot.name    
    let user = req.user
    let body = req.body || {}
    let query = req.query || {}
    let userid =user.id    
    let cityprovincename = body.cityprovincename || ''    
    let cityprovincecode = body.cityprovincecode || ''
    let districttownname = body.districttownname || ''
    let districttowncode = body.districttowncode || ''
    let streetblockname = body.streetblockname || ''
    let streetblockcode = body.streetblockcode || ''
    let address = body.address || ''
    let email = body.email || ''
    let phone = body.phone || '' 
    let phone2 = body.phone2 || ''
    let what3words = body.what3words ||''
    let merchant_code='chatbot-'+bot.name+bot.id
    let registration_number = body.registration_number || ''
    let status=body.status   
    let type='Төрөл 1'
    
    try{

        let id = await deliveryDAO.saveDelivery({
            botId: bot.id,
            account_name:name,            
            cityprovincename,
            cityprovincecode,
            districttownname,
            districttowncode,
            streetblockname,
            streetblockcode,
            address,
            email,
            phone,
            what3words,
            merchant_code,
            registration_number,
            status,
            type,
            userid
        })     
        console.log(id)

        if (id){

            let payload={
                branchNo:1,
                name,
                type,
                paymentTypeCd:'CONTRACT',
                zipcode:streetblockcode,
                addressDetail:address,
                w3w:what3words,
                cd:merchant_code,
                phone1:phone,
                phone2:phone2
            }

            let json = await deliveryService.apiCreateDeliveryCustomer(payload)
            


            // json {
            //     "code": null,
            //     "errors": null,
            //     "message": "Бүртгэлтэй харилцагчын код байна"
            // }
            if(json){
                if(json.code==1000){
                        payload={
                        botId: bot.id,
                        id,
                        status: json.result.newCustomer.status.code,
                        registration_number:json.result.newCustomer.no,
                        userid
                        }

                    let updatedid = await deliveryDAO.updateDeliveryStatus(payload)

                    return res.status(200).json({code: 1000, message: json.message, id})

                }else{
                    let ledid=await deliveryDAO.deleteDeliveryrequest({id})
                    return res.status(200).json({code: 1001, message: json.message})
                }
                
                
            }else{
                res.status(200).json({code: 1002, message: 'create customer mydlivery API failed'})
            }

        }else{
            res.status(500).json({code: 1001, message: 'Failed'})
        }

        

    }catch (err) {
        logger.error('save delivery error', err.message)
        res.status(200).json({code: 1001, message: err.message}) 
    }

})

router.post('/update/status', [authMiddleware(true), validBot, hasBotPermission(true)], async(req, res) =>{
    
    logger.info("update delivery post body", req.body); 
    let bot = req.bot
    let user = req.user
    let body = req.body || {}
    let query = req.query || {}
    let userid =user.id    
    let id = body.id || ''    
    let status = body.status || '' 
    let registration_number = body.registration_number || ''  
    
    
    try{

        let id = await deliveryDAO.updateDeliveryStatus({
            botId: bot.id,
            id,
            status,
            registration_number,
            userid
        })   
        
        
        return res.status(200).json({code: 1000, message: 'success', id})

    }catch (err) {
        logger.error('update Delivery status error', err.message)
        res.status(200).json({code: 1001, message: err.message}) 
    }

})

router.get('/fetchchildlist', [authMiddleware(true), validBot, hasBotPermission(true)], async(req, res) => {

    logger.info("fetchchildlist body", req.body)
    let query = req.query || {} 
    let bot = req.bot
    let zipcode = query.zipcode || ''
    //const {zipcode = ''} = body
   
    try {
        if (!zipcode) {
            return res.status(200).json({code: 1001, message: 'invalid zipcode parameter'})
        }        

        //get childlist
        let list = await deliveryService.apiFetchDeliveryChildList({                 
            zipcode
        })
        
        logger.info('apiFetchDeliveryChildList zipcode', zipcode)

        if (list) {
            if (list.code == 1000){
                return res.status(200).json(list.result)
            }else{
                return res.status(200).json({code: 1001, message: list.message})
            }
               
        }

        return res.status(200).json({code: 1001, message: 'invalid parameter'})


      } catch (err) {
        logger.error("apiFetchDeliveryChildList error", err.message)
        res.status(200).json({code: 1001, message: err.message})
    }

})

router.get('/test', [authMiddleware(true)], async(req, res) => {
    
    return res.status(200).json({code: 1000, message: 'success', list:"testeee"})
})

export default router