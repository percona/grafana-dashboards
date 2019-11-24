import { AxiosInstance } from 'axios';
interface GithubClientProps {
    required?: boolean;
    enterprise?: boolean;
}
declare class GithubClient {
    client: AxiosInstance;
    constructor({ required, enterprise }?: GithubClientProps);
    private createClient;
}
export default GithubClient;
