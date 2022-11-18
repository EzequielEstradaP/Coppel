package com.proyecto.empresa.controllers;
import com.proyecto.empresa.entities.Empleados;
import com.proyecto.empresa.services.IEmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class EmpleadosController {

        @Autowired
        private IEmpleadoService service;

        @GetMapping("/api/Empleado")
        public List<Empleados> getAll(){
                return service.getAll();
        }
        @GetMapping("/api/Empleado/{id}")
        public Empleados getById(@PathVariable String id){
                return service.getById(Long.parseLong(id));
        }

       @DeleteMapping("/api/Empleado/{id}")
        public void remove(@PathVariable String id){    //FUNCION O CLASE ELIMINAR
                service.remove(Long.parseLong(id));
        }
        @PostMapping("/api/Empleado")
        public void save(@RequestBody Empleados empleados){
                service.save(empleados);
        }


}
