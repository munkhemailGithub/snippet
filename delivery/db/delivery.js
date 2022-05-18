import db from '../../db/.';
import LogService from '../../lib/logService';

const logger = new LogService('chatbot_server_delivery')


export const getDeliveryRegistrationNumber = (params) => {
    const {botId} = params

    let sql = `SELECT 
                    ac.registration_number
                FROM bot_delivery ac 
                where ac.bot_id=? and ac.status<>'D' order by created_at desc limit 1`;   
    return db.sql(sql, botId)
        .then((rows) => {
            if (rows.length>0){
                return rows.map((row) => {
                    return JSON.parse(JSON.stringify(row))
                })
            }else{
                return rows.map((row) => {
                    return []
                })
            }
            
        })
        .catch((err) => {
            console.log(err)
            logger.error('get Delivery registeration status', err.message)
            return []
        })
}

export const getDeliveryStatus = (params) => {
    const {botId} = params

    let sql = `SELECT ac.status ,ac.id,
                    ac.cityprovincename,                                                
                    ac.districttownname,                                                 
                    ac.streetblockname,
                    ac.merchant_code,
                    ac.account_name,                                                
                    ac.address,
                    ac.email,
                    ac.phone,
                    ac.what3word,
                    ac.registration_number,
                    ac.created_at
                FROM bot_delivery ac 
                where ac.bot_id=? and ac.status<>'D' order by created_at desc limit 1`;
    return db.sql(sql, botId)
        .then((rows) => {
            if (rows.length>0){
                return rows.map((row) => {
                    return JSON.parse(JSON.stringify(row))
                })
            }else{
                return rows.map((row) => {
                    return []
                })
            }
            
        })
        .catch((err) => {
            console.log(err)
            logger.error('get Delivery registeration status', err.message)
            return []
        })
}

export const saveDelivery=(params)=>{
    
    const{botId,
        account_name,        
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
        userid}=params
        

    let insertsql=`insert into  bot_delivery 
            (bot_id, 

            account_name, 
            cityprovincename,
            cityprovincecode, 
            districttownname, 
            districttowncode, 
            streetblockname,
            streetblockcode,
            address,

            email,
            phone,
            what3word,
            merchant_code,
            registration_number,            

            status,
            type,
            created_at, updated_at)  
                                    values(

                                        ?,?,?,?,?,?,?,?,  ?,?,?,?,?,

                                        ?,
                                        ?,
                                        ?,
                                    now(),now())`


       let par=[botId,
        
        account_name,
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
       

        status,type]

        console.log(insertsql)
        console.log(par)
        
    return  db.sql(insertsql,par )
        .then((rows) => {
            console.log(rows)
            return rows.insertId
        })
        .catch((err) => {
            logger.error('insertBot customer my delivery', err.message)
            return 0
        })
}

export const updateDeliveryStatus=(params)=>{

    const{botId,
         id,
         registration_number='',
        status,
        }=params

        let par =[status,
            registration_number,
            id,
            botId]
    let updatesql=`update  bot_delivery set                                                  
                                                status=?,
                                                registration_number=?,
                                                updated_at =now()
                                                where id = ?
                                                and bot_id=?`
    
    return  db.sql(updatesql, par)
        .then((rows) => {
            return rows.affectedRows
        })
        .catch((err) => {
            logger.error('update bot delivery status', err.message)
            return 0
        })

}

export const deleteDeliveryrequest=(params)=>{

    const{
         id
        }=params
    let updatesql=`delete from bot_delivery where id = ?`
    return  db.sql(updatesql, [id])
        .then((rows) => {
            return rows.affectedRows
        })
        .catch((err) => {
            logger.error('delete bot delivery record', err.message)
            return 0
        })

}