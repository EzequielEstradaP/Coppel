import Empleado from "./Empleado";

export async function buscarEmpleado(){

    let url = process.env.REACT_APP_API + 'Empleado'
    let response = await fetch(url, {        
        "method": 'GET',
        "headers":{
                "Content-type": 'application/json'
        }
    })
    return await response.json();
}

export async function borrarEmpleado(id: string){
    let url = process.env.REACT_APP_API + 'Empleado/' + id
    await fetch(url, {        
        "method": 'UPDATE',
        "headers":{
                "Content-type": 'application/json'
        }
    })
}

export async function guardarEmpleado(empleado: Empleado){    
    let url = process.env.REACT_APP_API + 'Empleado'
    await fetch(url, {        
        "method": 'POST',
        "body": JSON.stringify(empleado),
        "headers":{
                "Content-type": 'application/json'
        }
    })
}

export async function buscarEmpleadoId(id: string){
    let url = process.env.REACT_APP_API + 'Empleado/' + id
    let response = await fetch(url, {        
        "method": 'GET',
        "headers":{
                "Content-type": 'application/json'
        }
    });
    return await response.json();      
}