// import  useSWR  from "swr";

// import fetcher from "@/libs/fetcher";

// const useCustomers = (userId?: string) => {

//     const url = userId ? `/api/customer?userId=${userId}` : '/api/customer';

//     const {data, error, isLoading, mutate} = useSWR(url, fetcher);

//     return {
//         data,
//         error,
//         isLoading,
//         mutate
//     };
// }

// export default useCustomers;