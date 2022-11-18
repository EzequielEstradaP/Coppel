package com.proyecto.empresa.services;
import com.proyecto.empresa.entities.Empleados;
import java.util.List;

public interface IEmpleadoService {
    List<Empleados> getAll();

    Empleados getById(Long id);
    void remove(Long id);
    void save(Empleados empleados);

}
