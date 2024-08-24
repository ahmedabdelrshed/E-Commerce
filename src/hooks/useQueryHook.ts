import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../conf/axios.config";
interface IProps {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig
}

const useQueryHook = ({ queryKey, url, config }: IProps) => useQuery({
    queryKey,
    queryFn: async () => {
        const { data } = await axiosInstance.get(url, config)
        return data
    }
})

export default useQueryHook