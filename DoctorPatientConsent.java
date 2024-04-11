package com.example.server.dto.request;

import com.example.server.doctor.DoctorEntity;
import com.example.server.patient.PatientEntity;
import lombok.Data;

@Data
public class DoctorPatientConsent {
    private DoctorEntity doctor;
    private PatientEntity patient;
    private DoctorEntity newDoctor;
}
