import { IonButton, IonButtons, IonCard, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkmark, close, options, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import './../Page.css';
import Empleado from './Empleado';
import { borrarEmpleado, buscarEmpleado, buscarEmpleadoId, guardarEmpleado } from './EmpleadoApi';

const EmpleadoEdit: React.FC = () => {

    const { name, id } = useParams<{ name: string; id: string }>(); 
    const [empleado, setEmpleado] = useState<Empleado>({});
    const history = useHistory();
  
    const routeMatch: any = useRouteMatch("/page/Empleado/:id");
    let ids = routeMatch?.params?.id;
  
      useEffect(() =>{
          search();
      }, [history.location.pathname]);
  
  
      const search = async () =>{
          if(id !== 'Empleados/new'){
           let result = await buscarEmpleadoId(id);
           setEmpleado(result);
          }
      }

   const save = async() => {    
    await guardarEmpleado(empleado);
    history.push('/page/Empleados'); 
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
        <IonCard>
        <IonTitle>{id === 'new' ? 'Agregar Empleado' : 'Editar Empleado'}</IonTitle>


    <IonRow>
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">NOMBRE</IonLabel>
            <IonInput onIonChange={e => empleado.nombre = String(e.detail.value)} 
            placeholder="Intruduzca el texto" value={empleado.nombre}></IonInput>
        </IonItem>
        </IonCol>
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">APELLIDO</IonLabel>
            <IonInput onIonChange={e => empleado.apellido = String(e.detail.value)} 
            placeholder="Intruduzca el texto" value={empleado.apellido}></IonInput>
        </IonItem>     
        </IonCol>
    </IonRow>
    <IonRow> 
    <IonCol>
        <IonItem>
            <IonLabel position="stacked">CARGO</IonLabel>
            <IonInput onIonChange={e => empleado.cargo = String(e.detail.value)} 
            placeholder="Intruduzca el texto" value={empleado.cargo}></IonInput>
        </IonItem>   
        </IonCol> 
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">Sueldo Base</IonLabel>                
            <IonInput onIonChange={e => empleado.sueldoBase = (Number(e.detail.value)*8)*6}
            value={Number(empleado.sueldoBase)}></IonInput>
        </IonItem>  
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">SUELDO X HORA</IonLabel>
            <IonInput onIonChange={e => empleado.sueldoHora = Number(e.detail.value)} 
            value={Number(empleado.sueldoHora)}>{empleado.sueldoBase}</IonInput>
        </IonItem>       
        </IonCol>
        <IonCol>


    <IonItem>
      <IonCheckbox slot="start"></IonCheckbox>
      <IonLabel>I agree to the terms and conditions</IonLabel>
    </IonItem>



        <IonItem>
            <IonLabel position="stacked">SUELDO X SEMANA</IonLabel>
            <IonInput readonly={false} onIonChange={e => empleado.sueldoSem = Number(e.detail.value)} 
            placeholder="Intruduzca el texto" value={Number(empleado.sueldoSem)}></IonInput>
        </IonItem> 

        
         
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">BONOS</IonLabel>
            <IonInput onIonChange={e => empleado.bono = Number(e.detail.value)} 
            placeholder="Intruduzca el texto" value={Number(empleado.bono)}></IonInput>
        </IonItem>
        </IonCol>
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">ISR (9%-3%)</IonLabel>
            <IonInput onIonChange={e => empleado.coutaIsr = (Number(e.detail.value)*Number(e.detail.value))/100} 
            placeholder="Intruduzca el texto" value={Number(empleado.coutaIsr)}></IonInput>
        </IonItem>     
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol>
        <IonItem>
            
                
            <IonLabel position="stacked">VALES</IonLabel>
            <IonInput onIonChange={e => empleado.vales = Number(e.detail.value)} 
            placeholder="Intruduzca el texto" value={Number(empleado.vales)}></IonInput>
        </IonItem>   
        </IonCol>
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">SUELDO MENSUAL</IonLabel>
            <IonInput onIonChange={e => empleado.sueldoMen = Number(e.detail.value)} 
            placeholder="Intruduzca el texto" value={Number(empleado.sueldoMen)}></IonInput>
        </IonItem>  
        </IonCol>
    </IonRow>
        <IonItem>            
            <IonButton onClick={save} color="primary" fill="outline" slot='end'>
            <IonIcon icon={checkmark}/>
             Guardar  
            </IonButton>
        </IonItem>

</IonCard>
      </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default EmpleadoEdit;
