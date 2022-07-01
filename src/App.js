import { createContext, useState } from "react";
import AddBillings from "./components/AddBillings/AddBillings";
import BillDetailsTable from "./components/BillDetails/BillDetailsTable";
import TopArea from "./components/TopArea/TopArea";
// import UserForm from "./components/userForm/userForm";

export const BillingContext = createContext();
export const AllBillContext = createContext();
export const SearchContext = createContext();
export const PaginationContext = createContext();

function App() {
  const [billInfo, setBillInfo] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });

  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({});

  return (
    <div>
      <SearchContext.Provider value={[searchTerm, setSearchTerm]}>
        <AllBillContext.Provider value={[bills, setBills]}>
          <BillingContext.Provider value={[billInfo, setBillInfo]}>
            <PaginationContext.Provider value={[pagination, setPagination]}>
              <TopArea />
              <AddBillings />
              <BillDetailsTable />
            </PaginationContext.Provider>
          </BillingContext.Provider>
        </AllBillContext.Provider>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
