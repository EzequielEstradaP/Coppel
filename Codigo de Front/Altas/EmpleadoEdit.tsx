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

        if(empleado.cargo =='chofer'){
                const cantidadEntregas = 0; //PAGO POR LAS ENTREGAS REALIZADAS
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
                    const cantidadEntregas = 0; //PAGO POR LAS ENTREGAS REALIZADAS
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
        if(empleado.cargo =='cargador'){
                  const cantidadEntregas = 0; //PAGO POR LAS ENTREGAS REALIZADAS
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
                        await guardarEmpleado(empleado);
                        history.push('/page/AgregarUsuario');             
                        
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

        <IonContent fullscreen>
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
        <IonCol>
    <IonList>
      <IonItem>
        <IonSelect onIonChange={e => empleado.cargo = String(e.detail.value)} 
        interface="popover" placeholder="Cargo">
            <IonSelectOption value="">Seleccion</IonSelectOption>
          <IonSelectOption value="chofer">Chofer</IonSelectOption>
          <IonSelectOption value="auxiliar">Auxiliar</IonSelectOption>
          <IonSelectOption value="cargador">Cargador</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
    </IonCol> 
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
