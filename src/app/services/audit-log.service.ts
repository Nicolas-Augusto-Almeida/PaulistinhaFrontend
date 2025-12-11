import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuditLog } from '../models/AuditLog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuditLogService {
  private apiUrl = 'http://localhost:8080/audit';

  private http = inject(HttpClient);

  listarLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.apiUrl, { withCredentials: true });
  }
}
