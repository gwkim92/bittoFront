import React, { useEffect, useState } from 'react';

const ScannerPage = () => {
	// const [blocks, setBlocks] = useState([]);
	const [blocks, setBlocks] = useState({ result: [] });
	const [transactions, setTransactions] = useState({ result: [] });

	useEffect(() => {
		// TODO: chain 분기 태우기
		fetch('http://localhost:4000/scan/eth/blocks')
			.then((res) => res.json())
			.then((data) => {
				setBlocks(data);
				// setBlocks(data.slice(0, 6));
			});

		fetch('http://localhost:4000/scan/eth/transactions')
			.then((res) => res.json())
			.then((data) => {
				setTransactions(data);
				// setTransactions(data.slice(0, 6));
			});
	}, []);

	// TODO: 13 자 이상 줄임
	return (
		<div className='p-6 space-y-6'>
			<h2 className='text-x1 font-semibold'>Latest Blocks</h2>
			<table className='w-full bg-white border divide-y divide-gray-200 rounded shadow'>
				<thead>
					<tr className='bg-gray-50'>
						<th className='px-4 py-2'>Block No.</th>
						<th className='px-4 py-2'>Fee Recipient</th>
						<th className='px-4 py-2'>Eth</th>
						<th className='px-4 py-2'>secs ago</th>
						<th className='px-4 py-2'>txns in secs</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{/* {Array.isArray(blocks) &&
						blocks.map((block) => {
							// TODO: fee recipient, eth, secs ago, txn is secs 값 백엔드 구현 후 추가
							<tr key={block.number}>
								<td>{block.number}</td>
								<td>{block.number}</td>
								<td>{block.number}</td>
								<td>{block.number}</td>
							</tr>;
						})} */}
					{/* {console.log('blocks result : ', blocks.result)} */}
					{Array.isArray(blocks.result) &&
						blocks.result.map((block) => (
							<tr key={block.number}>
								<td className='px-4 py-2'>{block.number}</td>
								<td className='px-4 py-2'>{block.number}</td>
								<td className='px-4 py-2'>{block.number}</td>
								<td className='px-4 py-2'>{block.number}</td>
								<td className='px-4 py-2'>{block.number}</td>
							</tr>
						))}
				</tbody>
			</table>

			<h2 className='text-x1 font-semibold'>Latest Transactions</h2>
			<table className='w-full bg-white border divide-y divide-gray-200 rounded shadow'>
				<thead>
					<tr className='bg-gray-50'>
						<th className='px-4 py-2'>Hash</th>
						<th className='px-4 py-2'>From</th>
						<th className='px-4 py-2'>To</th>
						<th className='px-4 py-2'>Value</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{console.log('txs : ', transactions)}
					{Array.isArray(transactions.result) &&
						transactions.result.map((transaction) => (
							<tr key={transaction.hash}>
								<td className='px-4 py-2 truncate'>
									{transaction.hash}
								</td>
								<td className='px-4 py-2 truncate'>
									{transaction.from_address}
								</td>
								<td className='px-4 py-2 truncate'>
									{transaction.to_address}
								</td>
								<td className='px-4 py-2'>
									{transaction.hash}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default ScannerPage;
