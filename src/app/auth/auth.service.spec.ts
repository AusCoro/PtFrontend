import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

  describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should store the token in localStorage when setToken is called', () => {
      const token = 'test-token';
      service.setToken(token);
      expect(localStorage.getItem('token')).toBe(token);
    });

    it('should retrieve the token from localStorage when getToken is called', () => {
      const token = 'test-token';
      localStorage.setItem('token', token);
      expect(service.getToken()).toBe(token);
    });

    it('should return true when there is a token in localStorage', () => {
      const token = 'test-token';
      localStorage.setItem('token', token);
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false when there is no token in localStorage', () => {
      localStorage.removeItem('token');
      expect(service.isAuthenticated()).toBeFalse();
    });

    it('should remove the token from localStorage when logout is called', () => {
      const token = 'test-token';
      localStorage.setItem('token', token);
      service.logout();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
