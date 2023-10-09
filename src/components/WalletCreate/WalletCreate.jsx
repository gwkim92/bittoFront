import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axionInstance from '../../utils/axios';

const WalletCreate = () => {
	const [mnemonic, setMnemonic] = useState('');
	const [address, setAddress] = useState('');
	const [privateKey, setprivateKey] = useState('');
	const [password, setPassword] = useState('');

	const userData = useSelector((state) => state.user?.userData);
	// const dispatch = useDispatch();
	// console.log("userData : ", userData.id);
	const userId = userData.id;
	//비번 세팅
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};
	const isValidPassword = () => {
		// 비밀번호 유효성 검사
		return password.length >= 8;
	};

	//   //   const pwd = userData.id;
	//   const generateMnemonic = async () => {
	//     try {
	//       const result = await axionInstance.get(`/walletService/generateMnemonic`);
	//       setMnemonic(result.data.mnemonic);
	//     } catch (error) {
	//       console.error("Error while generating mnemonic:", error.message);
	//     }
	//   };

	//   const generateAddress = async () => {
	//     console.log("mnemonic : ", mnemonic);
	//     try {
	//       const result = await axionInstance.post(
	//         `/walletService/generateAddress`,
	//         { mnemonic, pwd }
	//       );
	//       console.log("address result : ", result);
	//       setAddress(result.data.address);
	//     } catch (error) {
	//       console.error("Error while generating address:", error.message);
	//     }
	//   };

	const generateWallet = async () => {
		try {
			const result = await axionInstance.post(
				`/walletService/generateWallet`,
				{
					password,
				}
			);
			setMnemonic(result.data.mnemonic);
			setAddress(result.data.address);
			setprivateKey(result.data.privateKey);
			try {
				const walletData = await axionInstance.post(
					`/walletService/saveWalletData`,
					{
						userId,
						address,
						password,
					}
				);
				console.log('wallet Data save : ', walletData.data);
			} catch (error) {
				console.error('Error while save DB:', error.message);
			}
		} catch (error) {
			console.error('Error while generating wallet:', error.message);
		}
	};

	const recoveryPrivateKey = async () => {
		try {
			const recovery = await axionInstance.post(
				`/walletService/recoveryPrivateKey`,
				{ mnemonic, password }
			);
			setprivateKey(recovery.data.privateKey);
		} catch (error) {
			console.error('Error while generating privateKey:', error.message);
		}
	};
	return (
		<div>
			<h1>Wallet App</h1>
			<label htmlFor='password'>비밀번호: </label>
			<input
				id='password'
				type='password'
				placeholder='비밀번호를 입력하세요'
				value={password}
				onChange={handlePasswordChange}
			/>
			{isValidPassword() ? (
				<button onClick={generateWallet}>지갑 생성</button>
			) : (
				<p style={{ color: 'red' }}>올바른 비밀번호를 입력하세요.</p>
			)}
			<h2>니모닉 코드</h2>
			<p>{mnemonic || '지갑이 생성되지 않았습니다.'}</p>
			<h2>지갑 주소</h2>
			<p>{address || '지갑이 생성되지 않았습니다.'}</p>
			<h2>프라이빗 키</h2>
			<p>{privateKey || '지갑이 생성되지 않았습니다.'}</p>
		</div>
	);
};
export default WalletCreate;
