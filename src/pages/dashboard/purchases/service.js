import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getMostFrequentSuppliers(startTime, endTime){
  return request(`/api/getMostFrequentSuppliers?startTime=${startTime}&endTime=${endTime}`)
}

export async function getMostPurchasedSuppliers(startTime, endTime){
  return request(`/api/getMostPurchasedSuppliers?startTime=${startTime}&endTime=${endTime}`)
}

export async function getPurchaseData(startTime, endTime, store){
  return request(`/api/getPurchaseData?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}