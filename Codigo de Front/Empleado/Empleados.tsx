import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil, reload } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import './../Page.css';
import Empleado from './Empleado';
import { borrarEmpleado, buscarEmpleado, guardarEmpleado } from './EmpleadoApi';

const Empleados: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const history = useHistory();

  const routeMatch: any = useRouteMatch("/page/Empleado/:id");
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
      history.push('Empleados/new');
      search();      
   }
    
        const editEmpleado = (ids: string) =>{
         history.push('Empleados/' + ids);
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
        <IonTitle>Gestion de Empleados</IonTitle>
        <IonItem>
         <div>Solución para el empleado de nominas, modificar, eliminar y conocer la información del
          completa del empleado. </div>
        </IonItem>
        <IonGrid className="table">
        <IonRow>
        <IonCol>id</IonCol>
          <IonCol>Acciones</IonCol>
          <IonCol></IonCol>
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
        <IonCol>
            <IonButton fill="clear" color="primary"
                onClick={() => editEmpleado(String(empleado.id))} >
                <IonIcon icon={pencil}slot="icon-only"/>
            </IonButton>
        </IonCol>
        <IonCol>
            <IonButton fill="clear" color="danger"
            onClick={() => remove(String(empleado.id))} >
                <IonIcon icon={close}slot="icon-only" />
            </IonButton>            
        </IonCol>
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

export default Empleados;
