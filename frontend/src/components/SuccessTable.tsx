import type { SuccessRecord } from "../types";

interface Props {
    records: SuccessRecord[];
}

export default function SuccessTable({ records }: Props) {
    if (records.length === 0) return <p>No hubo registros exitosos</p>

    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="pb-3 pr-4 w-16">ID</th>
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3 w-20">Age</th>
                </tr>
            </thead>
            <tbody>
                {records.map(r => (
                    <tr key={r.id} className="border-b border-gray-100">
                        <td className="py-3 pr-4 text-gray-400">{r.id}</td>
                        <td className="py-3 pr-4 text-gray-700">{r.name}</td>
                        <td className="py-3 pr-4 text-blue-600">{r.email}</td>
                        <td className="py-3 text-gray-700">{r.age ?? '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
