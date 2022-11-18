import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil, reload } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import './../Page.css';
import Empleado from './Empleado';
import { borrarEmpleado, buscarEmpleado, guardarEmpleado } from './EmpleadoApi';

const Captura: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const history = useHistory();

  const routeMatch: any = useRouteMatch("/page/Captura/:id");
  let id = routeMatch?.params?.id;
 
    useEffect(() =>{
        search();
    }, [history.location.pathname]); // HACEMOS UN TIPO REFRESH DE VENTANA DESPUES DE CARGAR EL COMPONENTE EN LA FUNCION SEARCH

    const search = async () =>{
        let result = await buscarEmpleado();
        setEmpleados(result);
    }
    const remove = async(id: string) => {
        await borrarEmpleado(id);
        search();
    }
    const addEmpleado = () =>{ // REVISAR PARA LA ACCIÓN DE QUITAR ENTREGAS
      history.push('Captura/new');
      search();      
    }    
        const editEmpleado = (id: string) =>{
         history.push('Captura/' + id);
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
          <IonTitle>Sistema de Entregas</IonTitle>
        <IonItem> 
          <div>Solución para el empleado de nominas y realizar los registros
            de las entregas realizadas.</div>      
        </IonItem>

            <IonGrid className="table">              
        <IonRow>
          <IonCol>id</IonCol>
          <IonCol>Acciones</IonCol>          
          <IonCol>Nombre</IonCol>
          <IonCol>Cargo</IonCol>
          <IonCol>Entregas Realizadas</IonCol>
        </IonRow>
      </IonGrid>
      <IonGrid>
           {empleados.map((empleado: Empleado) =>
        <IonRow>
        <IonCol>{empleado.id}</IonCol>
        <IonCol>
            <IonButton fill="clear" color="primary"
                onClick={() => editEmpleado(String(empleado.id))} >
                <IonIcon icon={add}slot="icon-only"/>
            </IonButton>
         
        </IonCol>
          <IonCol>{empleado.nombre} {empleado.apellido}</IonCol>
          <IonCol>{empleado.cargo}</IonCol>
          <IonCol>$ {empleado.bono} MNX</IonCol>   
        </IonRow>
            )} 
      </IonGrid>
      </IonCard>
      </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Captura;
