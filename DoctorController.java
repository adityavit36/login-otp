package com.example.server.doctor;
import com.example.server.connection.ConnectionEntity;
import com.example.server.connection.ConnectionService;
import com.example.server.consent.ConsentEntity;
import com.example.server.consultation.ConsultationService;
import com.example.server.dto.request.DoctorPatientConsent;
import com.example.server.dto.request.EmailRequest;
import com.example.server.dto.request.LoginUserRequest;
import com.example.server.dto.request.VerifyEmailRequest;
import com.example.server.dto.response.*;
import com.example.server.emailOtpPassword.EmailSender;
import com.example.server.hospitalSpecialization.HospitalSpecializationEntity;
import com.example.server.patient.PatientController;
import com.example.server.patient.PatientEntity;
import com.example.server.patient.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.server.consultation.ConsultationEntity;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {
    private final DoctorService doctor;

    private final EmailSender emailSender;
    private final ConnectionService connection;
    private final PatientService patient;
    private final ConsultationService consultation;

    public DoctorController(DoctorService doctor, EmailSender emailSender, ConnectionService connection, PatientService patient, ConsultationService consultation) {
        this.doctor = doctor;
        this.emailSender = emailSender;
        this.connection = connection;
        this.patient = patient;
        this.consultation = consultation;
    }

    @PostMapping("/login")
    ResponseEntity<DoctorLoginResponse> loginDoctor(@RequestBody VerifyEmailRequest body){
        DoctorEntity newDoctor = doctor.verifyDoctor(
                body.getUser().getEmail(),
                body.getUser().getOtp()
        );
        List<ConnectionEntity> connectionEntities=connection.findAllConnectionsByDoctor(newDoctor);
        List<AppointmentDetailsDto> pastAppointmentDetails = consultation.findPastAppointments(connectionEntities);
        List<AppointmentDetailsDto> futureAppointmentDetails = consultation.findFutureAppointments(connectionEntities);
        Integer patientCount=connection.countPatient(newDoctor);
        Integer appointmentCount=consultation.countAppointments(connectionEntities);
        List<EachDayCount> eachDayCounts=consultation.sendEachDayCount(connectionEntities);
        DoctorLoginResponse doctorLoginResponse=new DoctorLoginResponse();
        doctorLoginResponse.setDoctorId(newDoctor.getId());
        doctorLoginResponse.setFirstName(newDoctor.getFirstName());
        doctorLoginResponse.setLastName(newDoctor.getLastName());
        doctorLoginResponse.setDegree(newDoctor.getDegree());
        doctorLoginResponse.setFirstTimeLogin(newDoctor.isFirstTimeLogin());
        doctorLoginResponse.setRegistrationId(newDoctor.getRegistrationId());
        doctorLoginResponse.setEachDayCounts(eachDayCounts);
        doctorLoginResponse.setTotalAppointments(appointmentCount);
        doctorLoginResponse.setPastAppointmentDetails(pastAppointmentDetails);
        doctorLoginResponse.setFutureAppointmentDetails(futureAppointmentDetails);
        doctorLoginResponse.setTotalPatients(patientCount);
        return ResponseEntity.ok(doctorLoginResponse);
    }

    @PostMapping("/loginotp")
    ResponseEntity<Void> loginDoctoremail(@RequestBody LoginUserRequest body){
        if(!doctor.checkDoctor(body.getUser().getEmail())){
            throw new PatientService.PatientNotFoundException();
        }
        DoctorEntity currentDoctor = doctor.doctorDetails(body.getUser().getEmail());
        String otp = emailSender.sendOtpEmail(
                body.getUser().getEmail(),
                currentDoctor.getFirstName()
        );
        DoctorEntity doctor1 = doctor.updateOtp(otp, currentDoctor.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/departmentDetails")
    public ResponseEntity<DepartmentDto> getDepartmentOfDoctorId(@RequestBody EmailRequest emailRequest) {
        DoctorEntity doctorEntity = doctor.findDoctorByEmail(emailRequest.getEmail());
        if(doctorEntity==null){
            throw new PatientController.UnexpectedErrorException();
        }
        HospitalSpecializationEntity hospitalSpecialization = doctorEntity.getHospitalSpecialization();
        //senior doctor name
        String headDoctorFirstName = hospitalSpecialization.getHeadDoctor().getFirstName();
        String headDoctorLastName = hospitalSpecialization.getHeadDoctor().getLastName();
        String headDoctorName = headDoctorFirstName + ' ' + headDoctorLastName;
        String currSpecialization = hospitalSpecialization.getSpecialization().getName();
        List<String> doctors = doctor.getDoctorsFromSameSpecialization(hospitalSpecialization);
        DepartmentDto departmentDto = new DepartmentDto(headDoctorName, currSpecialization, doctors);
        return ResponseEntity.ok(departmentDto);
    }
//TODO: send details of all patients of a doctor and all doctros to send consent
//    @GetMapping("/viewPatientsAndDoctors")
//    public ResponseEntity<Void> getPatientsDoctors(@ResponseBody EmailRequest emailRequest){
//        DoctorEntity mainDoctor = doctor.findDoctorByEmail(emailRequest.getEmail());
//
//    }
    @GetMapping("/landingPage")
    public ResponseEntity<List<DoctorDetailsResponse>> getDoctorDetails()
    {
        List<DoctorDetailsResponse> doctorDetailsResponses = doctor.getAllDoctorDetails();
        return ResponseEntity.ok(doctorDetailsResponses);
    }

//    @GetMapping("/getPatientsAndAllDoctors")
//    public ResponseEntity<PatientHospitalBranchDoctorResponse>
    @PostMapping("/registerConsent")
    public ResponseEntity<?> getPatientAndSeniorDoctorConsent(DoctorPatientConsent doctorPatientConsent) {
        DoctorEntity doctorEntity = doctor.findDoctorByEmail(doctorPatientConsent.getDoctor().getEmail());
        PatientEntity patientEntity = patient.patientDetails(doctorPatientConsent.getPatient().getEmail());
        DoctorEntity newDoctorEntity = doctor.findDoctorByEmail(doctorPatientConsent.getNewDoctor().getEmail());
        ConnectionEntity connectionEntity = connection.findConnection(doctorPatientConsent.getDoctor().getEmail(),doctorPatientConsent.getPatient().getEmail());
        ConsentEntity consentEntity = new ConsentEntity();
        consentEntity.setConnect(connectionEntity);
        consentEntity.setSeniorDoctorConsent(false);
        consentEntity.setPatientConsent(false);
        consentEntity.setNewDoctor(newDoctorEntity);
        emailSender.sendConsentEmailToPatient(patientEntity.getEmail(),patientEntity.getFirstName(),doctorEntity.getFirstName(),newDoctorEntity.getFirstName());
        emailSender.sendConsentEmailToSrDoctor(doctorEntity.getHospitalSpecialization().getHeadDoctor().getEmail(),doctorEntity.getHospitalSpecialization().getHeadDoctor().getFirstName(),patientEntity.getFirstName(),doctorEntity.getFirstName(),newDoctorEntity.getFirstName());
        return ResponseEntity.status(HttpStatus.CREATED).body("Consent Registered Successfully");
    }
    @GetMapping("/getall")
    public ResponseEntity<?> getAllDoctors() {
         List<DoctorDetailsResponse> doc = doctor.getAllDoctorDetails();
         return ResponseEntity.ok(doc);
    }
    @GetMapping("/doctorEmail/{doctorEmail}")
    public List<LocalDateTime> getDoctorAppointmentDate(@PathVariable String doctorEmail) {
        DoctorEntity doctorEntity = doctor.findDoctorByEmail(doctorEmail);
        List<ConnectionEntity> connections = doctorEntity.getConnection();
        List<LocalDateTime> appointments = connections.stream()
                .flatMap(connection -> connection.getConsultation().stream()
                        .map(ConsultationEntity::getAppointmentDateAndTime))
                .collect(Collectors.toList());
        return appointments;
    }
//    @PostMapping("/setSeniorDoctorConsent")
//    public ResponseEntity<Void> setSeniorDoctorConsent(DoctorPatientConsent doctorPatientConsent) {
//        DoctorEntity doctorEntity = doctor.findDoctorByEmail(doctorPatientConsent.getDoctor().getEmail());
//        ConnectionEntity connectionEntity = connection.findConnection(doctorPatientConsent.getDoctor().getEmail(),doctorPatientConsent.getPatient().getEmail());
//        List<ConsentEntity> consentEntities = consentRepo.getAll();
//        for(ConsentEntity consent : consentEntities) {
//            if(consent.getConnect().equals(connectionEntity)) {
//                consent.setSeniorDoctorConsent(true);
//            }
//        }
//        return null;
//    }
}