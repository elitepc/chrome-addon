import request from 'axios';
import { teamlyzerApi } from '../config';

export async function getRating({ slug, source }) {
  try {
    const res = await request.get(`${teamlyzerApi.host}/rating-addon/${slug}`, {
      auth: teamlyzerApi.auth,
      params: {
        source,
      }
    });
    if (res.data.Error) {
      return null;
    }
    return {
      companyId: res.data.company_id,
      companyName: res.data.company_name,
      rating: res.data.rating,
      url: res.data.url,
    };
  } catch (err) {
    throw new Error(err);
  }
}

export async function getDetailedRating({ slug, source }) {
  try {
    const res = await request.get(`${teamlyzerApi.host}/detailed-rating-addon/${slug}`, {
      auth: teamlyzerApi.auth,
      params: {
        source,
      }
    });
    if (res.data.Error) {
      return null;
    }
    return {
      careerOpportunity: parseFloat(res.data.career_opportunity, 10),
      interviewDifficulty: parseFloat(res.data.interview_difficulty, 10),
      managementQuality: parseFloat(res.data.management_quality, 10),
      recognitionAndReward: parseFloat(res.data.recognition_and_reward, 10),
      workLifeBalance: parseFloat(res.data.work_life_balance, 10),
      salary: parseFloat(res.data.salary, 10),
    };
  } catch (err) {
    throw new Error(err);
  }
}

export async function getJobReviews({ slug, source }) {
  try {
    const res = await request.get(`${teamlyzerApi.host}/job-reviews-addon/${slug}`, {
      auth: teamlyzerApi.auth,
      params: {
        source,
      }
    });
    if (res.data[0] && res.data[0].Error) {
      return null;
    }
    return res.data.map((review) => ({
      rating: review.rating,
      title: review.review_title,
      views: review.views,
      votes: review.votes,
      date: review.ts,
      url: review.url,
    }));
  } catch (err) {
    throw new Error(err);
  }
}

export async function getInterviewReviews({ slug, source }) {
  try {
    const res = await request.get(`${teamlyzerApi.host}/interview-reviews-addon/${slug}`, {
      auth: teamlyzerApi.auth,
      params: {
        source,
      }
    });
    if (res.data[0] && res.data[0].Error) {
      return null;
    }
    return res.data.map((review) => ({
      rating: review.rating,
      title: review.review_title,
      views: review.views,
      votes: review.votes,
      date: review.ts,
      url: review.url,
    }));
  } catch (err) {
    throw new Error(err);
  }
}

export async function getSalaryDetails({ slug, source }) {
  try {
    const res = await request.get(`${teamlyzerApi.host}/salary-reviews-addon/${slug}`, {
      auth: teamlyzerApi.auth,
      params: {
        source,
      }
    });
    if (res.data.Error) {
      return null;
    }
    return {
      avgJobSalary: {
        salaryMaxAvg: res.data.avg_job_salary.salary_max_avg,
        salaryMinAvg: res.data.avg_job_salary.salary_min_avg,
      },
      avgJobSalaryIndustry: {
        salaryMaxAvg: res.data.avg_job_salary_industry.salary_max_avg,
        salaryMinAvg: res.data.avg_job_salary_industry.salary_min_avg,
      },
      salaryCompanyDetails: {
        salaryMin: res.data.salary_company_details[0].salary_min,
        salaryMax: res.data.salary_company_details[0].salary_max,
        salaryMedian: res.data.salary_company_details[0].salary_median,
        totalSalaries: res.data.salary_company_details[0].total_salaries,
      },
      industryName: res.data.industry,
      industrySlug: res.data.industry_slug,
      companyId: res.data.company_id,
      companyName: res.data.company_name,
    };
  } catch (err) {
    throw new Error(err);
  }
}

export async function getCompanyDetails(filters) {
  const [rating, details, { industryName, industrySlug, ...salary }] = await Promise.all([
    getRating(filters),
    getDetailedRating(filters),
    // TODO: not yet developed
    // getJobReviews(filters),
    // getInterviewReviews(filters),
    getSalaryDetails(filters),
  ]);
  return {
    ...rating,
    industrySlug,
    industryName,
    details,
    // jobReviews,
    // interviewReviews,
    salary,
  };
}

export default getCompanyDetails;
