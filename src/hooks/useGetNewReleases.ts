import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getNewRealeases } from "../apis/albumApi";

const useGetNewReleases = () => {
    const clientCredentialToken = useClientCredentialToken();

    return useQuery({
        queryKey: ['new-releases'],
        queryFn: async () => {
            if (!clientCredentialToken) {
                throw new Error('Client credential token is undefined');
            }
            return getNewRealeases(clientCredentialToken);
        }
    })
};

export default useGetNewReleases;