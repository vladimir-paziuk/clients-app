import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { DoctorsRepository } from 'src/doctors/doctors.repository';
import { DoctorsService } from 'src/doctors/doctors.service';

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
    it('calls DoctorsService.createDoctor and returns the result', async () => {
      expect.assertions(1);

      doctorsRepository.createDoctor.mockResolvedValue(mockDoctor);
      const result = await doctorsService.createDoctor(mockDoctorDto);
      expect(result).toEqual(mockDoctor);
    });
  });

  describe('getDoctors', () => {
    it('calls DoctorsService.getDoctors and returns the result', async () => {
      expect.assertions(1);

      doctorsRepository.getDoctors.mockResolvedValue([mockDoctor]);
      const result = await doctorsService.getDoctors();
      expect(result).toEqual([mockDoctor]);
    });
  });

  describe('getDoctorById', () => {
    it('calls DoctorsService.getDoctorById and returns the result', async () => {
      expect.assertions(1);

      doctorsRepository.findOne.mockResolvedValue(mockDoctor);
      const result = await doctorsService.getDoctorById(mockDoctorId);
      expect(result).toEqual(mockDoctor);
    });

    it('calls DoctorsService.getDoctorById and returns not found exception', async () => {
      expect.assertions(1);

      doctorsRepository.findOne.mockResolvedValue(null);
      await expect(doctorsService.getDoctorById(mockDoctorId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateDoctorById', () => {
    it('calls DoctorsService.updateDoctorById', async () => {
      expect.assertions(1);

      doctorsRepository.update.mockResolvedValue({ affected: 1 });

      await doctorsService.updateDoctorById(mockDoctorId, mockDoctorDto);

      expect(doctorsRepository.update).toBeCalledWith(
        { id: mockDoctorId },
        mockDoctorDto,
      );
    });

    it('calls DoctorsService.update and returns not found exception', async () => {
      expect.assertions(1);

      doctorsRepository.update.mockResolvedValue({ affected: 0 });
      await expect(
        doctorsService.updateDoctorById(mockDoctorId, mockDoctorDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteDoctorById', () => {
    it('calls DoctorsService.deleteDoctorById', async () => {
      expect.assertions(1);

      doctorsRepository.delete.mockResolvedValue({ affected: 1 });

      await doctorsService.deleteDoctorById(mockDoctorId);

      expect(doctorsRepository.delete).toBeCalledWith({ id: mockDoctorId });
    });

    it('calls DoctorsService.deleteDoctorById and returns not found exception', async () => {
      expect.assertions(1);

      doctorsRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(
        doctorsService.deleteDoctorById(mockDoctorId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
