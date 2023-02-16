import { Router } from "express";
import { getUsers, addUsers} from "../Controller/userRegistration";


 const router = Router()

router.get('',getUsers)
router.post('',addUsers)

export default router