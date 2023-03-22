import axios from "axios";
import './AdminHomePage.css';
import AdminProtected from "../components/AdminProtected";
import { useEffect, useState } from "react";
import AdminNavBar from "../UI/AdminNavBar";
import MuiShopTable from "../components/MuiTShopTable";


//axios.defaults.withCredentials = true;
const AdminHomePage = () => {

    const [shops, setShops] = useState();
    async function getshops() {
        try {
            const res = await axios.get("http://localhost:3000/api/shop/", {
                withCredentials: true,
            });
            const data = res.data.shops;
            return data;

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const findshops = async () => {
            const data = await getshops();
            setShops(data);
        }
        findshops();
    }, [])
    return (<>
        <AdminNavBar />
        <AdminProtected>
            {!shops && <h1>Loading...</h1>}
            {shops && <MuiShopTable shops={shops} />}
        </AdminProtected>
    </>);
}
export default AdminHomePage;