export default function useAuthService() {
    const getUserDetails = () => {
        const userDetails = localStorage.getItem('authDetails');

        if(typeof userDetails === 'string' && userDetails !== 'undefined') return JSON.parse(userDetails);
    }
    
    const isUserAuthenticated = (): boolean => {
        const userDetails = getUserDetails();
        if(!userDetails) return false;
    
        return true;
    };

    return { getUserDetails, isUserAuthenticated };
 }