package com.proyecto.empresa.services;
import com.proyecto.empresa.entities.Empleados;
import com.proyecto.empresa.repositiry.EmpleadosReposirity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.List;

@Service
public class EmpleadoServices implements IEmpleadoService{

    @Autowired
    private EmpleadosReposirity reposirity;

    @Override
    public List<Empleados> getAll(){ //FUNCION O CLASE TRAER_TODO
       return (List<Empleados>) reposirity.findAll();

    }

    @Override
    public Empleados getById(Long id) {    //FUNCION O CLASE BUSCAR
        return (Empleados) reposirity.findById(id).get();
    }
    @Override
    public void remove(Long id){    //FUNCION O CLASE ELIMINAR
        reposirity.deleteById(id);
    }
    @Override
    public void save(Empleados empleados){
        reposirity.save(empleados);
    }


}
