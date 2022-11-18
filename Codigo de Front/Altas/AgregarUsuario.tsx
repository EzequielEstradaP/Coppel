import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil, reload } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import './../Page.css';
import Empleado from './Empleado';
import { borrarEmpleado, buscarEmpleado, guardarEmpleado } from './EmpleadoApi';

const AgregarUsuario: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const history = useHistory();

  const routeMatch: any = useRouteMatch("/page/AgregarUsuario/:id");
  let ids = routeMatch?.params?.id;
 
    useEffect(() =>{
        search();
    }, [history.location.pathname]); // HACEMOS UN TIPO REFRESH DE VENTANA DESPUES DE CARGAR EL COMPONENTE EN LA FUNCION SEARCH


    const search = async () =>{
        let result = await buscarEmpleado();
        setEmpleados(result);
    }
    const remove = async(ids: string) => {
        await borrarEmpleado(ids);
        search();
    }
    const addEmpleado = () =>{
      history.push('AgregarUsuario/new');
      search();      
    }    
        const editEmpleado = (ids: string) =>{
         history.push('AgregarUsuario/' + ids);
        }
        
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>           
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonCard><IonCol></IonCol>
        <IonTitle>Altas de Empleados de Empleados</IonTitle>
        <IonItem><div>Solución para el empleado de nominas pueda realizar las altas de los empleados
          de nuevo ingreso.
        </div>
            <IonButton onClick={addEmpleado} color="primary" fill="outline" slot='end'>
            <IonIcon icon={add}/>
             Agregar Empleado   
            </IonButton>
        </IonItem>
        <IonGrid className="table">
        <IonRow>
          <IonCol>id</IonCol>
          <IonCol>Nombre</IonCol>
          <IonCol>Cargo</IonCol>
          <IonCol>Sueldo Bruto</IonCol>
          <IonCol>Vales</IonCol>
          <IonCol>Bono hrs Trabajadas</IonCol>
          <IonCol>Entregas Realizadas</IonCol>
          <IonCol>ISR Retenido</IonCol>
          <IonCol> ISR %</IonCol>
          <IonCol>Pago Total</IonCol>
        </IonRow>
      </IonGrid>

      <IonGrid>
           {empleados.map((empleado: Empleado) =>
        <IonRow>
        <IonCol>{empleado.id}</IonCol>
        <IonCol>{empleado.nombre} {empleado.apellido}</IonCol>
        <IonCol>{empleado.cargo}</IonCol> 
        <IonCol>$ {empleado.sueldoBase}MXN</IonCol>  
        <IonCol>$ {empleado.sueldoHora}MXN</IonCol>  
        <IonCol>$ {empleado.sueldoSem}MXN</IonCol>   
        <IonCol>$ {empleado.bono} MNX</IonCol>    
        <IonCol>$ {empleado.coutaIsr}MXN</IonCol>   
        <IonCol>{empleado.vales}%</IonCol>   
        <IonCol>$ {empleado.sueldoMen}MXN</IonCol>    
        </IonRow>
            )} 
      </IonGrid>
</IonCard>
      </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default AgregarUsuario;
