package com.proyecto.empresa.entities;

import lombok.*;

import javax.annotation.processing.Generated;
import javax.persistence.*;

@Entity   // Empleados es una entidad
@Table(name = "empleadosbd")
@ToString
@EqualsAndHashCode
@Getter @Setter
public class Empleados{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private String cargo;
    private Double sueldoBase;
    private Double sueldoHora;
    private Double sueldoSem;
    private Double bono;
    private Double coutaIsr;
    private Double vales;
    private Double sueldoMen;
    private Double entregas;
    private Double bono1;
    private Double entregas1;
    private Double bono2;
    private Double entregas2;

}
