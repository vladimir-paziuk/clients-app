import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/constants/base.entity';
import { DoctorEntity } from 'src/doctors/doctor.entity';
import { PatientEntity } from 'src/patients/patient.entity';

@Entity('appointments')
export class AppointmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: 'patient_id' })
  patientId?: string;

  @ManyToOne(() => DoctorEntity)
  @JoinColumn({ name: 'doctor_id' })
  doctorId?: string;

  @Column()
  reason?: string;

  @Column({ name: 'reserved_at' })
  reservedAt?: string;
}
