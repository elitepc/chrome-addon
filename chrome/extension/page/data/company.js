import { messageBackground } from '../messaging';

export async function getCompanyInfo(slug) {
  return await messageBackground({
    method: 'company.get',
    data: {
      slug,
    },
  });
}
