package com.proyecto.empresa.repositiry;

import com.proyecto.empresa.entities.Empleados;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadosReposirity extends CrudRepository<Empleados, Long> {
}
