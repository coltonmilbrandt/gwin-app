import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
import { abi } from "../constants/TokenFarm_abi"
import { chainDict } from "../constants/chainDict"
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import Balances from '../components/Balances'

export default function Stake() {
    const { isWeb3Enabled, account, chainId: chainIdHex, Moralis } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const chainName = chainDict[chainId]

    const contractsInfo = require('../constants/contractInfo.json'); 

    const [tokenFarm, setTokenFarm] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })
    const [daiToken, setDaiToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
        price_address: '0x0000000000000000000000000000000000000000',
    })
    const [gwinToken, setGwinToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })
    const [wethToken, setWethToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
        price_address: '0x0000000000000000000000000000000000000000',
    })
    const [token, setToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })

    const [wethValue, setWethValue] = useState("")
    const [gwinValue, setGwinValue] = useState("")
    const [daiValue, setDaiValue] = useState("")
    const [gwinWalletBalance, setGwinWalletBalance] = useState(0)
    const [wethWalletBalance, setWethWalletBalance] = useState(0)
    const [daiWalletBalance, setDaiWalletBalance] = useState(0)
    const [daiStakedBalance, setDaiStakedBalance] = useState(0)
    const [gwinStakedBalance, setGwinStakedBalance] = useState(0)
    const [wethStakedBalance, setWethStakedBalance] = useState(0)
    const [tokenAmount, setTokenAmount] = useState(0)
    const [isUnstaking, setIsUnstaking] = useState(false)
    const [isStaking, setIsStaking] = useState(false)

    const [count, setCount] = useState(0)
    const [isLoaded, setIsLoaded] = useState(0)

    const setContracts = () => {
        if(chainName) {
            console.log(chainName)
            setTokenFarm(contractsInfo[0]["networks"][chainName]["contracts"]["token_farm"])
            setDaiToken(contractsInfo[0]["networks"][chainName]["contracts"]["dai_token"])
            setGwinToken(contractsInfo[0]["networks"][chainName]["contracts"]["gwin_token"])
            setWethToken(contractsInfo[0]["networks"][chainName]["contracts"]["weth_token"])
        }
    }

    ///////////   Contract Functions   ////////////

    const { 
        runContractFunction: approveToken,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: token.abi,
        contractAddress: token.address,
        functionName: "approve",
        params: {spender: tokenFarm.address, amount: Moralis.Units.ETH(tokenAmount)},
    })

    const { runContractFunction: stakeTokens
    } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "stakeTokens",
        params: {
            _amount: Moralis.Units.ETH(tokenAmount),
            _token: token.address,
        },
    })

    const { runContractFunction: unstakeTokens
    } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "unstakeTokens",
        params: {
            _token: token.address
        },
    })

    ///////////   View Functions   ////////////
    
    // getUserTotalValue()
    const { runContractFunction: getUserTotalValue
    } = useWeb3Contract({
        abi: abi,
        contractAddress: "0x48efFEBe8879A7024654dda2d90F1EF56b12f135",
        functionName: "getUserTotalValue",
        params: {
            _user: "0x3789F5efFb5022DEF4Fbc14d325e946c7B422eE3"
        },
    })
    
    // GetTokenValue()
    const { 
        runContractFunction: getTokenValue
    } = useWeb3Contract({
        abi: abi,
        contractAddress: "0x48efFEBe8879A7024654dda2d90F1EF56b12f135",
        functionName: "getTokenValue",
        params: {_token: "0xe1F284B9FB056cbF75A92c9b879594d1C74Fa7b9"},
    })

    //////   Wallet Balance Functions   //////

    const { 
        runContractFunction: getBalanceOfGwinToken
    } = useWeb3Contract({
        abi: gwinToken.abi,
        contractAddress: gwinToken.address,
        functionName: "balanceOf",
        params: {
            account: account
        }
    })

    const { 
        runContractFunction: getBalanceOfWethToken
    } = useWeb3Contract({
        abi: wethToken.abi,
        contractAddress: wethToken.address,
        functionName: "balanceOf",
        params: {
            account: account
        }
    })

    const { 
        runContractFunction: getBalanceOfDaiToken
    } = useWeb3Contract({
        abi: daiToken.abi,
        contractAddress: daiToken.address,
        functionName: "balanceOf",
        params: {
            account: account
        }
    })

    //////   Staked Balance Functions   //////

    const { 
        runContractFunction: getStakedDai
    } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "getUserSingleTokenStakedValue",
        params: {
            _user: account,
            _token: daiToken.address,
        }
    })

    const { 
        runContractFunction: getStakedWeth
    } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "getUserSingleTokenStakedValue",
        params: {
            _user: account,
            _token: wethToken.address,
        }
    })

    const { 
        runContractFunction: getStakedGwin
    } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "getUserSingleTokenStakedValue",
        params: {
            _user: account,
            _token: gwinToken.address,
        }
    })

    ///////////   Toast Messsage Updates   ////////////

    const handleStakeSuccess = async (tx) => {
        await tx.wait(1)
        toast.success('Successfully Staked!')
        await updateUIValues()
        await getTokenBalances()
        setIsStaking(false)
        resetValues()
    }
    
    const handleStakeError = async (error) => {
        console.log(error)
        toast.error('Uh oh! Tx was approved but could not stake. Check console for error.')
        setIsStaking(false)
        resetValues()
    }

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        toast.success('Token approved for staking!')
        await stakeTokens({
            onSuccess: handleStakeSuccess,
            onError: (error) => handleStakeError(error, tx),
        })
    }

    const handleUnstakeSuccess = async (tx) => {
        await tx.wait(1)
        toast.success('Tokens successfully unstaked!')
        getTokenBalances()
    }

    const handleError = async (error) => {
        console.log(error)
        toast.error('Uh oh! Tx could not be approved. Check console for error.')
    }

    ///////////   Helpful Functions   ////////////

    const resetValues = () => {
        setWethValue("")
        setGwinValue("")
        setDaiValue("")
    }

    ///////////   Update UI   ////////////

    const updateUIValues = async (tokenVal) => {
        console.log("token test: ")
        console.log(tokenVal)
        if(tokenVal) {
            var tokenValue = tokenVal
            console.log("token: ")
            console.log(tokenValue)
            tokenValue = parseInt(tokenValue._hex)
            var tokenValue = tokenValue / Math.pow(10, 18)
            console.log(tokenValue)
            return tokenValue
        }
    }

    const getTokenBalances = async () => {
        const gwinTokenBalance = await getBalanceOfGwinToken()
        if(gwinTokenBalance){
            setGwinWalletBalance(await updateUIValues(gwinTokenBalance))
        }
        const wethTokenBalance = await getBalanceOfWethToken()
        if(wethTokenBalance){
            setWethWalletBalance(await updateUIValues(wethTokenBalance))
        }
        const daiTokenBalance = await getBalanceOfDaiToken()
        if(daiTokenBalance){
            setDaiWalletBalance(await updateUIValues(daiTokenBalance))
        }
        const stakedDaiBalance = await getStakedDai()
        if(stakedDaiBalance){
            setDaiStakedBalance(await updateUIValues(stakedDaiBalance))
        }
        const stakedGwinBalance = await getStakedGwin()
        if(stakedGwinBalance){
            setGwinStakedBalance(await updateUIValues(stakedGwinBalance))
        }
        const stakedWethBalance = await getStakedWeth()
        if(stakedWethBalance){
            setWethStakedBalance(await updateUIValues(stakedWethBalance))
        }
    }

    useEffect(() => {
        if(isWeb3Enabled){
            async function updateUI() {
                try {
                    setCount(count++)
                    console.log("count: " + count)
                    await setContracts()
                    await getTokenBalances()
                    setIsLoaded(isLoaded++)
                } catch (err) {
                    console.error(err)
                }
            }
            if (isWeb3Enabled) {
                updateUI()
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if(gwinToken.address != '0x0000000000000000000000000000000000000000'){
            async function updateBalances() {
                try {
                    setTimeout(async function(){
                        await getTokenBalances()
                    }, 2000)
                } catch (err) {
                    console.error(err)
                }
            }
            if(gwinToken.address != '0x0000000000000000000000000000000000000000'){
                updateBalances()
            }
        }
    }, [isWeb3Enabled, chainName, chainId, gwinToken, isUnstaking])

    useEffect(() => {
        async function handleUnstaking() {
            if(isUnstaking == true) {
                try {
                    await unstakeTokens({
                        onSuccess: handleUnstakeSuccess,
                        onError: (error) => handleError(error),
                    })
                    setIsUnstaking(false)
                } catch (err) {
                    console.error(err)
                }
            } else {
                setIsUnstaking(false)
            }
        }
        if(isUnstaking == true) {
            handleUnstaking()
        }
    }, [isUnstaking])

    useEffect(() => {
        async function handleStaking() {
            if(isStaking == true) {
                try {
                    await approveToken({
                        onSuccess: handleSuccess,
                        onError: (error) => handleError(error),
                    })
                } catch (err) {
                    console.error(err)
                }
            } else {
                setIsStaking(false)
            }
        }
        if(isStaking == true) {
            handleStaking()
        }
    }, [isStaking])


    return (
        <div>
            <Toaster />
            <div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
                <div>
                    <div className="bg-sky-50 m-3 shadow-lg p-4 rounded-lg text-gray-700">
                        <div class="justify-center flex pb-4">
                            <Image src="/../public/eth.png" class="bg-white rounded-full" width='100px' height='100px' alt="/" />
                        </div>
                        <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                            WETH - {wethToken.address}
                        </div>
                        <form>
                            <div class="flex justify-center">
                                <div class="mb-3 w-full">
                                    <input
                                    type="number"
                                    class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    id="wethInput"
                                    placeholder="WETH to Stake"
                                    value={wethValue}
                                    onInput={e => {if(e.target.value == ""){setWethValue("")} else {setWethValue(e.target.value)} } }
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="pr-1">
                                    <button 
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
                                        disabled={wethStakedBalance <= 0 || isUnstaking || isStaking}
                                        onClick={async () => {
                                            setToken(wethToken)
                                            setIsUnstaking(true)
                                        }}
                                    >
                                        {isUnstaking && token == wethToken ? (
                                            <div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
                                        ) : (
                                            "Unstake All"
                                        )}
                                    </button>
                                </div>
                                <div className="pl-1">
                                    <button 
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
                                        disabled={wethValue == 0 || wethValue == "" || isUnstaking || isStaking}
                                        onClick={async () => {
                                            setToken(wethToken)
                                            setTokenAmount(wethValue)
                                            setIsStaking(true)
                                        }}
                                    >
                                        {isStaking && wethValue > 0 ? (
                                            <div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
                                        ) : (
                                            "Stake Tokens"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Balances 
                        name = "WETH"
                        wallet = {wethWalletBalance}
                        staked = {wethStakedBalance}
                        price = "price"
                        tokenPic = "/../public/eth.png"
                        contract = {wethToken}
                    />
                </div>

                <div>
                    <div className="bg-sky-50 m-3 shadow-lg p-4 rounded-lg text-gray-700">
                        <div class="justify-center flex pb-4">
                            <Image src="/../public/gwin-rect.webp" class="bg-white rounded-full" width='100px' height='100px' alt="/" />
                        </div>
                        <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                            GWIN - {gwinToken.address}
                        </div>
                        <form>
                            <div class="flex justify-center">
                                <div class="mb-3 w-full">
                                    <input
                                    required
                                    type="number"
                                    class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    id="exampleNumber0"
                                    placeholder="GWIN to Stake"
                                    value={gwinValue}
                                    onInput={e => {if(e.target.value == ""){setGwinValue("")} else {setGwinValue(e.target.value)} } }
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="pr-1">
                                    <button 
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
                                        disabled={gwinStakedBalance <= 0 || isUnstaking || isStaking}
                                        onClick={async () => {
                                            setToken(gwinToken)
                                            setIsUnstaking(true)
                                        }}
                                    >
                                        {isUnstaking && token == gwinToken ? (
                                            <div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
                                        ) : (
                                            "Unstake All"
                                        )}
                                    </button>
                                </div>
                                <div className="pl-1">
                                    <button 
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
                                        disabled={gwinValue == 0 || gwinValue == "" || isUnstaking || isStaking}
                                        onClick={async () => {
                                            setToken(gwinToken)
                                            setTokenAmount(gwinValue)
                                            setIsStaking(true)
                                        }}
                                    >
                                        {isStaking && gwinValue > 0 ? (
                                            <div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
                                        ) : (
                                            "Stake Tokens"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Balances 
                        name = "GWIN"
                        wallet = {gwinWalletBalance}
                        staked = {gwinStakedBalance}
                        price = "price"
                        tokenPic = "/../public/gwin-rect.webp"
                        contract = {gwinToken}
                    />
                </div>
                
                <div>
                    <div className="bg-sky-50 m-3 shadow-lg p-4 rounded-lg text-gray-700">
                        <div class="justify-center flex pb-4">
                            <Image src="/../public/dai.png" class="bg-white rounded-full" width='100px' height='100px' alt="/" />
                        </div>
                        <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                            DAI - {daiToken.address}
                        </div>
                        <form>
                            <div class="flex justify-center">
                                <div class="mb-3 w-full">
                                    <input
                                    required
                                    type="number"
                                    class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    id="exampleNumber0"
                                    placeholder="DAI to Stake"
                                    value={daiValue}
                                    onInput={e => {if(e.target.value == ""){setDaiValue("")} else {setDaiValue(e.target.value)} } }
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="pr-1">
                                    <button 
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
                                        disabled={daiStakedBalance <= 0 || isUnstaking || isStaking}
                                        onClick={async () => {
                                            setToken(daiToken)
                                            setIsUnstaking(true)
                                        }}
                                    >
                                        {isUnstaking && token == daiToken ? (
                                            <div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
                                        ) : (
                                            "Unstake All"
                                        )}
                                    </button>
                                </div>
                                <div className="pl-1">
                                    <button 
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
                                        disabled={daiValue == 0 || daiValue == "" || isUnstaking || isStaking}
                                        onClick={async () => {
                                            setToken(daiToken)
                                            setTokenAmount(daiValue)
                                            setIsStaking(true)
                                        }}
                                    >
                                        {isStaking && daiValue > 0 ? (
                                            <div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
                                        ) : (
                                            "Stake Tokens"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Balances 
                        name = "DAI"
                        wallet = {daiWalletBalance}
                        staked = {daiStakedBalance}
                        price = "price"
                        tokenPic = "/../public/dai.png"
                        contract = {daiToken}
                    />
                </div>
            </div>
        </div>
    )
}