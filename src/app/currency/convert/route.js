import { NextResponse } from 'next/server';
import { validateCurrencyRequest } from '../../validators/api';
import {formatCurrency} from '../../../lib/utils';
import { writeToCache, readFromCache } from '../../../lib/cache';
export async function POST(req) {
	const startExcecution = performance.now();
    const body = await req.json();
    let validationResult = validateCurrencyRequest(JSON.stringify(body));
    
    if (!validationResult.length) {
		const jsonData = JSON.stringify(body);
    	const dataObject = JSON.parse(jsonData);
		const url = process.env.CURRENCY_URL + `?to=${dataObject.to.toUpperCase()}&from=${dataObject.from.toUpperCase()}&amount=${dataObject.amount}`;
		const cachedData = readFromCache(url);
		try {
			const res = cachedData === null ? await fetch(url, {
				method: 'GET',
				headers: {
				'Content-Type': 'application/json',
				'apikey': process.env.DATA_API_KEY,
				},
			}) : cachedData;
			// Server response from cache if same request exists.
			if (cachedData !== null) {
				const resultWithFormatPrice = cachedData.status == 200 ?
					formatCurrency(cachedData, dataObject.to) : 
					cachedData;
				return NextResponse.json(
					resultWithFormatPrice,
					{
					status: cachedData.status,
					headers: {
						'Server-Timing': `api-cache;dur=${performance.now() - startExcecution};desc=HIT`
					},
					},
				);
			}
			// Serve response from server anc cache the response
			if (res.status == 200) {
				const responseData = await res.json();
				if (cachedData === null) {
					responseData['status'] = res.status;
					writeToCache(url, responseData);
				}
				const resultWithFormatPrice = formatCurrency(responseData, dataObject.to);
				
				return NextResponse.json(
					resultWithFormatPrice,
					{
					status: 200,
					headers: {
						'Server-Timing': `api-server;dur=${performance.now() - startExcecution};desc=CACHE-MISS`,
					},
					},
				);
			} else {
				const responseData = await res.json();
				responseData['status'] = res.status;
				if (cachedData === null) {
					responseData['status'] = res.status;
					writeToCache(url, responseData);
				}
				return NextResponse.json(
					responseData,
					{
					status: res.status,
					headers: {
						'Server-Timing': `api-server;dur=${performance.now() - startExcecution};desc=CACHE-MISS`,
					},
					},
				);
			}
		} catch (error) {
			return NextResponse.json({ errors: 'Api unable to fetch'});
		}
      	
    } else {
      	return NextResponse.json({ errors: validationResult})
    }
}