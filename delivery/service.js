import config from '../config';
import fetchWithTimeout from '../lib/fetchWithTimeout';
import fetchWithTimeoutOnlyJson from './fetchWithTimeoutOnlyJson';
import LogService from '../lib/logService';

const logger = new LogService('chatbot_delivery_service', 'INFO')




export const apiFetchDeliveryChildList = (params) => {
    const { signal, zipcode, ...rest } = params
    let url = 'http://dev.mydelivery.mn/api/common/zipcode/childList?zipcode='+zipcode
    
    return fetchWithTimeout(url, {
        headers: {
            
            'Content-Type': 'application/json',
            'X-Auth-Token': 'test',
            'X-Auth-Svc': 'TEST_TEST_CHATBOT_MN'
        },
        method: "GET",
        mode: 'cors',
        signal
    })
}

export const apiGetDeliveryCustomer = (params) => {
    const { signal, deliverycustno, ...rest } = params
    let url = 'http://dev.mydelivery.mn/api/settings/customer/'+deliverycustno
    
    return fetchWithTimeout(url, {
        headers: {
            
            'Content-Type': 'application/json',
            'X-Auth-Token': 'test',
            'X-Auth-Svc': 'TEST_CHATBOT_MN'
        },
        method: "GET",
        mode: 'cors',
        signal
    })
}

export const apiCreateDeliveryCustomer = (params) => {
    const { signal, ...rest } = params
    let url = 'http://dev.mydelivery.mn/api/settings/customer'
    
    return fetchWithTimeoutOnlyJson(url, {
        headers: {
            
            'Content-Type': 'application/json',
            'X-Auth-Token': 'test',
            'X-Auth-Svc': 'TEST_CHATBOT_MN'
        },
        method: "POST",
        body: JSON.stringify(rest),
        mode: 'cors',
        signal
    })
}

export const apiUpdateDeliveryCustomer = (params) => {
    const { signal, deliverycustno, ...rest } = params
    let url = 'http://dev.mydelivery.mn/api/settings/customer/'+deliverycustno
    
    return fetchWithTimeoutOnlyJson(url, {
        headers: {
            
            'Content-Type': 'application/json',
            'X-Auth-Token': 'test',
            'X-Auth-Svc': 'TEST_CHATBOT_MN'
        },
        method: "PUT",
        body: JSON.stringify(rest),
        mode: 'cors',
        signal
    })
}

export const apiDeleteDeliveryCustomer = (params) => {
    const { signal, deliverycustno, ...rest } = params
    let url = 'http://dev.mydelivery.mn/api/settings/customer/'+deliverycustno+'/status'
    
    return fetchWithTimeoutOnlyJson(url, {
        headers: {
            
            'Content-Type': 'application/json',
            'X-Auth-Token': 'test',
            'X-Auth-Svc': 'TEST_CHATBOT_MN'
        },
        method: "PUT",
        body: JSON.stringify(rest),
        mode: 'cors',
        signal
    })
}

export const apiCalculateDeliveryCost = (params) => {
    const { signal, ...rest } = params
    let url = 'http://dev.mydelivery.mn/api/external/calculateDeliveryCost'
    
    return fetchWithTimeoutOnlyJson(url, {
        headers: {
            
            'Content-Type': 'application/json',
            'X-Auth-Token': 'test',
            'X-Auth-Svc': 'TEST_CHATBOT_MN'
        },
        method: "POST",
        body: JSON.stringify(rest),
        mode: 'cors',
        signal
    })
}

export const apiCreateShipmentOrder= (params) => {
    const { signal, ...rest } = params
    let url = 'http://dev.mydelivery.mn/api/order/'
    
    return fetchWithTimeoutOnlyJson(url, {
        headers: {
            
            'Content-Type': 'application/json',
            'X-Auth-Token': 'test',
            'X-Auth-Svc': 'TEST_CHATBOT_MN'
        },
        method: "POST",
        body: JSON.stringify(rest),
        mode: 'cors',
        signal
    })
}

export const apiGetDeliveryStatus = (params) => {
    const { signal, deliverycustno, ...rest } = params
    let url = 'hhttp://www.mydelivery.mn/api/order/history/'+deliverycustno+'?tab=scan'
    
    return fetchWithTimeoutOnlyJson(url, {
        headers: {
            
            'Content-Type': 'application/json',
            'X-Auth-Token': 'test',
            'X-Auth-Svc': 'TEST_CHATBOT_MN'
        },
        method: "GET",
        mode: 'cors',
        signal
    })
}