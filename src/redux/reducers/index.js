import {combineReducers} from "redux"
import catalogos from "./catalogos"
import menus from "./menus"
import memoria from "./memoria"
import divisas from "./divisas"
import utils from "./utils"
import dashboard from "./dashboard"
export default combineReducers({
    catalogos,
    memoria,
    divisas,
    menus,
    utils,
    dashboard,
})