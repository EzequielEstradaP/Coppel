import { IonButton, IonButtons, IonCard, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
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
  
    const cantiEntregas =empleado.entregas;      
    const cantiEntregas1 =empleado.entregas;
    
    const cantiEntregas2 =empleado.entregas;
   
    
  
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
        
// empleado.entregas ES EL NUMERO RECIBIDO DE LAS ENTREGAS REALIZADAS

        if(empleado.cargo =='chofer'){  
          empleado.entregas = Number(cantiEntregas) + Number(empleado.entregas);
          const cantidadEntregas = Number(empleado.entregas); //PAGO POR LAS ENTREGAS REALIZADAS
          const valesdeDespensa = 0.04;
          const move = 5;    
          const sBase = 30; //SUELDO BASE X HORA
          const horaLaborada = 8; //HORAS LABORADAS POR DIA
          const semanaTrabajada = 6; //DIAS TRABAJADOS A LA SEMANA
          const bonoOtorgado =10; //BONO X CATEGORIA DE EMPLEADO
          const mesTrabajado = 4; // SEMANAS LABORADAS
          const diaTrabajado = sBase*horaLaborada; //SUELDO BRUTO DIARIO
          const suelBrutoSemana = (diaTrabajado)*semanaTrabajada ; //SUELDO BRUTO SEMANA
          const sueldoBrutoMensual = (suelBrutoSemana)*mesTrabajado; //SUELDO BRUTO MENSUAL SIN BONOS
          const bonoLaboral = (((horaLaborada*semanaTrabajada)*mesTrabajado)*bonoOtorgado); //TOTAL BONO POR HORAS TRABAJADAS AL MES
          const pagoRecorridos = cantidadEntregas*move;  ///ENTREGAS REALIZADAS  ******ESTE REVISAR 
          const sueloDeVales = (sueldoBrutoMensual*valesdeDespensa); //BONO DE VALES POR MES LABORADO
          const pagoMensual = (sueldoBrutoMensual+bonoLaboral+sueloDeVales+pagoRecorridos); //SUELDO + SUS VALES
         
  
                      if(pagoMensual > 10000){
                          const   Isr = 0.03;
                          const   descIsr= pagoMensual*Isr;
                          const sueldoFinal = pagoMensual-descIsr;
                          empleado.sueldoBase=sueldoBrutoMensual; //SUELDO MENSUAL BRUTO
                          empleado.sueldoSem=bonoLaboral;  //HORAS TRABAJADAS
                          empleado.bono=pagoRecorridos;  // ENTREGRAS REALIZAS
                          empleado.sueldoHora=sueloDeVales; // VALES     
                          empleado.vales=Isr;  //PORSENTAJE DE ISR DESCONTADO
                          empleado.coutaIsr=descIsr;  //DESCUENTO DE ISR
                          empleado.sueldoMen=sueldoFinal; //SUELDO TOTAL PAGADO
                  }
                  if(pagoMensual < 10000){
                  const   Isr = 0.09;
                  const   descIsr = pagoMensual*Isr;
                  const sueldoFinal = pagoMensual-descIsr;
                  empleado.sueldoBase=sueldoBrutoMensual; //SUELDO MENSUAL BRUTO
                  empleado.sueldoSem=bonoLaboral;  //HORAS TRABAJADAS
                  empleado.bono=pagoRecorridos;  // ENTREGRAS REALIZAS
                  empleado.sueldoHora=sueloDeVales; // VALES     
                  empleado.vales=Isr;  //PORSENTAJE DE ISR DESCONTADO
                  empleado.coutaIsr=descIsr;  //DESCUENTO DE ISR
                  empleado.sueldoMen=sueldoFinal; //SUELDO TOTAL PAGADO 
                  }
      }
            if(empleado.cargo =='auxiliar'){
              empleado.entregas1 = Number(cantiEntregas1) + Number(empleado.entregas);
              const cantidadEntregas = Number(empleado.entregas1); //PAGO POR LAS ENTREGAS REALIZADAS
              const valesdeDespensa = 0.04;
              const move = 5;    
              const sBase = 30; //SUELDO BASE X HORA
              const horaLaborada = 8; //HORAS LABORADAS POR DIA
              const semanaTrabajada = 6; //DIAS TRABAJADOS A LA SEMANA
              const bonoOtorgado =0; //BONO X CATEGORIA DE EMPLEADO
              const mesTrabajado = 4; // SEMANAS LABORADAS
              const diaTrabajado = sBase*horaLaborada; //SUELDO BRUTO DIARIO
              const suelBrutoSemana = (diaTrabajado)*semanaTrabajada ; //SUELDO BRUTO SEMANA
              const sueldoBrutoMensual = (suelBrutoSemana)*mesTrabajado; //SUELDO BRUTO MENSUAL SIN BONOS
              const bonoLaboral = (((horaLaborada*semanaTrabajada)*mesTrabajado)*bonoOtorgado); //TOTAL BONO POR HORAS TRABAJADAS AL MES
              const pagoRecorridos = cantidadEntregas*move;  ///ENTREGAS REALIZADAS  ******ESTE REVISAR 
              const sueloDeVales = (sueldoBrutoMensual*valesdeDespensa); //BONO DE VALES POR MES LABORADO
              const pagoMensual = (sueldoBrutoMensual+bonoLaboral+sueloDeVales+pagoRecorridos); //SUELDO + SUS VALES
            
  
                          if(pagoMensual > 10000){
                              const   Isr = 0.03;
                              const   descIsr= pagoMensual*Isr;
                              const sueldoFinal = pagoMensual-descIsr;
                              empleado.sueldoBase=sueldoBrutoMensual; //SUELDO MENSUAL BRUTO
                              empleado.sueldoSem=bonoLaboral;  //HORAS TRABAJADAS
                              empleado.bono=pagoRecorridos;  // ENTREGRAS REALIZAS
                              empleado.bono1=pagoRecorridos;  // ENTREGRAS REALIZAS
                              empleado.sueldoHora=sueloDeVales; // VALES     
                              empleado.vales=Isr;  //PORSENTAJE DE ISR DESCONTADO
                              empleado.coutaIsr=descIsr;  //DESCUENTO DE ISR
                              empleado.sueldoMen=sueldoFinal; //SUELDO TOTAL PAGADO
  
  
                      }
                      if(pagoMensual < 10000){
                      const   Isr = 0.09;
                      const   descIsr = pagoMensual*Isr;
                      const sueldoFinal = pagoMensual-descIsr;
                      empleado.sueldoBase=sueldoBrutoMensual; //SUELDO MENSUAL BRUTO
                      empleado.sueldoSem=bonoLaboral;  //HORAS TRABAJADAS
                      empleado.bono=pagoRecorridos;  // ENTREGRAS REALIZAS
                      empleado.bono1=pagoRecorridos;  // ENTREGRAS REALIZAS
                      empleado.sueldoHora=sueloDeVales; // VALES     
                      empleado.vales=Isr;  //PORSENTAJE DE ISR DESCONTADO
                      empleado.coutaIsr=descIsr;  //DESCUENTO DE ISR
                      empleado.sueldoMen=sueldoFinal; //SUELDO TOTAL PAGADO
                      
  
                      }
          }
  if(empleado.cargo =='cargador'){
    
            empleado.entregas2 = Number(cantiEntregas2) + Number(empleado.entregas);
            const cantidadEntregas = Number(empleado.entregas2); //PAGO POR LAS ENTREGAS REALIZADAS
            const valesdeDespensa = 0.04;
            const move = 5;    
            const sBase = 30; //SUELDO BASE X HORA
            const horaLaborada = 8; //HORAS LABORADAS POR DIA
            const semanaTrabajada = 6; //DIAS TRABAJADOS A LA SEMANA
            const bonoOtorgado =5; //BONO X CATEGORIA DE EMPLEADO
            const mesTrabajado = 4; // SEMANAS LABORADAS
            const diaTrabajado = sBase*horaLaborada; //SUELDO BRUTO DIARIO
            const suelBrutoSemana = (diaTrabajado)*semanaTrabajada ; //SUELDO BRUTO SEMANA
            const sueldoBrutoMensual = (suelBrutoSemana)*mesTrabajado; //SUELDO BRUTO MENSUAL SIN BONOS
            const bonoLaboral = (((horaLaborada*semanaTrabajada)*mesTrabajado)*bonoOtorgado); //TOTAL BONO POR HORAS TRABAJADAS AL MES
            const pagoRecorridos = cantidadEntregas*move;  ///ENTREGAS REALIZADAS  ******ESTE REVISAR 
            const sueloDeVales = (sueldoBrutoMensual*valesdeDespensa); //BONO DE VALES POR MES LABORADO
            const pagoMensual = (sueldoBrutoMensual+bonoLaboral+sueloDeVales+pagoRecorridos); //SUELDO + SUS VALES
           
  
                        if(pagoMensual > 10000){
                            const   Isr = 0.03;
                            const   descIsr= pagoMensual*Isr;
                            const sueldoFinal = pagoMensual-descIsr;
                            empleado.sueldoBase=sueldoBrutoMensual; //SUELDO MENSUAL BRUTO
                            empleado.sueldoSem=bonoLaboral;  //HORAS TRABAJADAS
                            empleado.bono2=pagoRecorridos;  // ENTREGRAS REALIZAS
                            empleado.bono=pagoRecorridos;  // ENTREGRAS REALIZAS
                            empleado.sueldoHora=sueloDeVales; // VALES     
                            empleado.vales=Isr;  //PORSENTAJE DE ISR DESCONTADO
                            empleado.coutaIsr=descIsr;  //DESCUENTO DE ISR
                            empleado.sueldoMen=sueldoFinal; //SUELDO TOTAL PAGADO
                            
  
                    }
                    if(pagoMensual < 10000){
                    const   Isr = 0.09;
                    const   descIsr = pagoMensual*Isr;
                    const sueldoFinal = pagoMensual-descIsr;
                    empleado.sueldoBase=sueldoBrutoMensual; //SUELDO MENSUAL BRUTO
                    empleado.sueldoSem=bonoLaboral;  //HORAS TRABAJADAS
                    empleado.bono2=pagoRecorridos;  // ENTREGRAS REALIZAS
                    empleado.bono=pagoRecorridos;  // ENTREGRAS REALIZAS
                    empleado.sueldoHora=sueloDeVales; // VALES     
                    empleado.vales=Isr;  //PORSENTAJE DE ISR DESCONTADO
                    empleado.coutaIsr=descIsr;  //DESCUENTO DE ISR
                    empleado.sueldoMen=sueldoFinal; //SUELDO TOTAL PAGADO
  
  
                    }
  }
         
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
        <IonTitle>{id === 'new' ? 'Agregar Empleado' : 'Captura de movimientos por mes'}</IonTitle>
    <IonRow>
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">NOMBRE</IonLabel>
            <IonInput onIonChange={e => empleado.nombre = String(e.detail.value)} 
            placeholder="Intruduzca el texto" value={empleado.nombre} disabled={true}></IonInput>
        </IonItem>
        </IonCol>
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">APELLIDO</IonLabel>
            <IonInput onIonChange={e => empleado.apellido = String(e.detail.value)} 
            placeholder="Intruduzca el texto" value={empleado.apellido} disabled={true}></IonInput>
        </IonItem>     
        </IonCol>
    </IonRow>
    <IonRow> 
    <IonCol>
        <IonItem>
            <IonLabel position="stacked">CARGO</IonLabel>
            <IonInput onIonChange={e => empleado.cargo = String(e.detail.value)} 
            placeholder="Intruduzca el texto" value={empleado.cargo} disabled={true}></IonInput>
        </IonItem>   
        </IonCol> 
        <IonCol>
        <IonItem>
            <IonLabel position="stacked">CANTIDAD DE ENTREGAS</IonLabel>       

                <IonInput onIonChange={e => empleado.bono = Number(e.detail.value)}  
               placeholder="Intruduzca el texto" value={Number(empleado.bono)} disabled={true}></IonInput>  
                              
        </IonItem>
        </IonCol>
        <IonCol>

        <IonCol>
    <IonList>
      <IonItem>
        <IonSelect onIonChange={e => empleado.entregas = Number(e.detail.value)} 
        interface="popover" placeholder="Cantidad a ingresar">
          <IonSelectOption value="1">1</IonSelectOption>
          <IonSelectOption value="2">2</IonSelectOption>
          <IonSelectOption value="3">3</IonSelectOption>
          <IonSelectOption value="4">4</IonSelectOption>
          <IonSelectOption value="5">5</IonSelectOption>
          <IonSelectOption value="6">6</IonSelectOption>
          <IonSelectOption value="7">7</IonSelectOption>
          <IonSelectOption value="8">8</IonSelectOption>
          <IonSelectOption value="9">9</IonSelectOption>
          <IonSelectOption value="10">10</IonSelectOption>
          <IonSelectOption value="11">11</IonSelectOption>
          <IonSelectOption value="12">12</IonSelectOption>
          <IonSelectOption value="13">13</IonSelectOption>
          <IonSelectOption value="14">14</IonSelectOption>
          <IonSelectOption value="15">15</IonSelectOption>
          <IonSelectOption value="16">16</IonSelectOption>
          <IonSelectOption value="17">17</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
    </IonCol>
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
