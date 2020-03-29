import { messageBackground } from '../messaging';

export async function getCompanyInfo(data) {
  return await messageBackground({
    method: 'company.get',
    data,
  });
}
