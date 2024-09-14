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
});
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when user is not logged in', () => {
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeFalse();
  });

  it('should return true when user is logged in', () => {
    service.login();
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeTrue();
  });

  it('should set loggedIn to true and store in localStorage when login is called', () => {
    service.login();
    const isLoggedIn = service.isLoggedIn();
    const storedValue = localStorage.getItem('isLoggedIn');
    expect(isLoggedIn).toBeTrue();
    expect(storedValue).toBe('true');
  });

  it('should set loggedIn to false and remove from localStorage when logout is called', () => {
    service.logout();
    const isLoggedIn = service.isLoggedIn();
    const storedValue = localStorage.getItem('isLoggedIn');
    expect(isLoggedIn).toBeFalse();
    expect(storedValue).toBeNull();
  });

  it('should initialize loggedIn state based on localStorage', () => {
    localStorage.setItem('isLoggedIn', 'true');
    service.initializeAuthenticationState();
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeTrue();
  });
});
