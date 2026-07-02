import type React from "react";
import type { SuccessRecord } from "../types";

interface Props {
    records: SuccessRecord[];
}

export default function SuccessTable({ records }: Props) {
    if (records.length === 0) return <p>No hubo registros exitosos</p>

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
            <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th style={th}>ID</th>
                    <th style={th}>Name</th>
                    <th style={th}>Email</th>
                    <th style={th}>Age</th>
                </tr>
            </thead>
            <tbody>
                {records.map(r => (
                    <tr key={r.id}>
                        <td style={td}>{r.id}</td>
                        <td style={td}>{r.name}</td>
                        <td style={td}>{r.email}</td>
                        <td style={td}>{r.age ?? '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const th: React.CSSProperties = {
    padding: '8px 12px',
    textAlign: 'left',
    borderBottom: '2px solid #ccc',
}

const td: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid #eee',
}