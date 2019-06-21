import axios from "axios";

export default async (base_url, membershipType, membershipId, activitytype) => {
  const result = await axios(
    `${base_url}/api/${activitytype}/matches?membershipId=${membershipId}&membershipType=${membershipType}`
  );

  return { success: true, data: result.data };
};
