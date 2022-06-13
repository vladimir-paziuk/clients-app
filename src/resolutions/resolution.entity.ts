import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { PatientEntity } from 'src/patients/patient.entity';
import { DoctorEntity } from 'src/doctors/doctor.entity';
import { AppointmentEntity } from 'src/appointments/appointment.entity';
import { BaseEntity } from 'src/common/constants/base.entity';

@Entity('resolutions')
export class ResolutionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: 'patient_id' })
  @Exclude({ toPlainOnly: true })
  patient: PatientEntity;
  @Column({ name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => DoctorEntity)
  @JoinColumn({ name: 'doctor_id' })
  @Exclude({ toPlainOnly: true })
  doctor: DoctorEntity;
  @Column({ name: 'doctor_id' })
  doctorId: string;

  @ManyToOne(() => AppointmentEntity)
  @JoinColumn({ name: 'appointment_id' })
  @Exclude({ toPlainOnly: true })
  appointment: AppointmentEntity;
  @Column({ name: 'appointment_id' })
  appointmentId: string;

  @Column()
  summary: string;
}
