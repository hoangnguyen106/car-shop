import { useState, createContext, useEffect } from 'react';
import { getMyAccount } from '../../api/apiAccount';

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [account, setAccount] = useState(true);
  useEffect(async () => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const myAccount = await getMyAccount();
      if (myAccount) setAccount(myAccount);
      else setAccount();
    } else setAccount();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export { AccountContext };
export default AccountProvider;
