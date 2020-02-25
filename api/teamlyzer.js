import request from 'axios';
import { teamlyzerApi } from '../config';

import { mock } from './mock';
const id = '1000';

export async function getRating(filters) {
  try {
    const res = await request.get(`${teamlyzerApi.host}/rating/${id}`, {
      auth: teamlyzerApi.auth
    });
    if (res.data.Error) {
      return null;
    }
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getDetailedRating(filters) {
  try {
    const res = await request.get(`${teamlyzerApi.host}/detailed-rating/${id}`, {
      auth: teamlyzerApi.auth
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

export async function getJobReviews(filters) {
  try {
    const res = await request.get(`${teamlyzerApi.host}/job-reviews/${id}`, {
      auth: teamlyzerApi.auth
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

export async function getInterviewReviews(filters) {
  try {
    const res = await request.get(`${teamlyzerApi.host}/interview-reviews/${id}`, {
      auth: teamlyzerApi.auth
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

export async function getCompanyDetails(filters) {
  try {
    const rating = await getRating(filters);
    const detailedRating = await getDetailedRating(filters);
    const jobReviews = await getJobReviews(filters);
    const interviewReviews = await getInterviewReviews(filters);
    return {
      ...rating,
      details: {
        ...detailedRating,
      },
      jobReviews: {
        ...jobReviews
      },
      interviewReviews: {
        ...interviewReviews
      },
    };
  } catch (err) {
    return mock;
  }
}

export default getCompanyDetails;
