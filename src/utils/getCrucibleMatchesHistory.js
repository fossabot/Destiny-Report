import axios from "axios";

export default async (base_url, membershipType, membershipId) => {
  const result = await axios(
    `${base_url}/api/crucible/matches?membershipId=${membershipId}&membershipType=${membershipType}`
  );

  return { success: true, data: result.data };
};
