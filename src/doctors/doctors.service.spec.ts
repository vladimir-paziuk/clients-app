import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { DoctorsRepository } from './doctors.repository';
import { DoctorsService } from './doctors.service';

const mockDoctorsRepository = () => ({
  getDoctors: jest.fn(),
  createDoctor: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockDoctorId = 'uuid';
const mockDoctorSpecialization = 'Specialization';

const mockDoctor = {
  id: mockDoctorId,
  specialization: mockDoctorSpecialization,
};
const mockDoctorDto = {
  specialization: mockDoctorSpecialization,
};

describe('DoctorsService', () => {
  let doctorsService: DoctorsService;
  let doctorsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DoctorsService,
        { provide: DoctorsRepository, useFactory: mockDoctorsRepository },
      ],
    }).compile();

    doctorsService = module.get(DoctorsService);
    doctorsRepository = module.get(DoctorsRepository);
  });

  describe('createDoctor', () => {
    it('calls DoctorsRepository.createDoctor and returns the result', async () => {
      expect.assertions(1);

      doctorsRepository.createDoctor.mockResolvedValue(mockDoctor);
      const result = await doctorsService.createDoctor(mockDoctorDto);
      expect(result).toEqual(mockDoctor);
    });
  });

  describe('getDoctors', () => {
    it('calls DoctorsRepository.getDoctors and returns the result', async () => {
      expect.assertions(1);

      doctorsRepository.getDoctors.mockResolvedValue([mockDoctor]);
      const result = await doctorsService.getDoctors();
      expect(result).toEqual([mockDoctor]);
    });
  });

  describe('getDoctorById', () => {
    it('calls DoctorsRepository.findOne and returns the result', async () => {
      expect.assertions(1);

      doctorsRepository.findOne.mockResolvedValue(mockDoctor);
      const result = await doctorsService.getDoctorById(mockDoctorId);
      expect(result).toEqual(mockDoctor);
    });

    it('calls DoctorsRepository.findOne and returns not found exception', async () => {
      expect.assertions(1);

      doctorsRepository.findOne.mockResolvedValue(null);
      expect(doctorsService.getDoctorById(mockDoctorId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateDoctorById', () => {
    it('calls DoctorsRepository.update and returns not found exception', async () => {
      expect.assertions(1);

      doctorsRepository.update.mockResolvedValue({ affected: 0 });
      expect(
        doctorsService.updateDoctorById(mockDoctorId, mockDoctorDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteDoctorById', () => {
    it('calls DoctorsRepository.delete and returns not found exception', async () => {
      expect.assertions(1);

      doctorsRepository.delete.mockResolvedValue({ affected: 0 });
      expect(doctorsService.deleteDoctorById(mockDoctorId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
