import ModalFormEmpleados from "../components/modals/empleados/modalForm";
import ModalFormUsuarios from "../components/modals/usuarios/modalForm";
import ModalFormDepartamentos from "../components/modals/departamentos/modalForm";
import ModalFormPuestos from "../components/modals/puestos/modalForm";
const componentsByURL = {
  "/empleados": ModalFormEmpleados,
  "/usuarios": ModalFormUsuarios,
  "/departamentos":ModalFormDepartamentos,
  "/puestos":ModalFormPuestos,
  "/contrato":ModalFormPuestos,
  "/generos":ModalFormPuestos,
};
export default componentsByURL