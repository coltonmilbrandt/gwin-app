import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import abi from "../constants/TokenFarm_abi.json"

const TOKEN_FARM_CONTRACT_ADDRESS = "0xCB157CA76f07F61988FfaFF272eb3BbAA8B94Bd6"



export default function Stake() {

    const { isWeb3Enabled } = useMoralis()
    const [userTotalValue, setUserTotalValue] = useState("undefined")
    const [tokenValue, setTokenValue] = useState([])
    const tokens = []
    const tokenValues = []
    // Stake to contract
    // const { runContractFunction: stakeTokens } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: "0xCB157CA76f07F61988FfaFF272eb3BbAA8B94Bd6",
    //     functionName: "stakeTokens",
    //     params: {},
    //     msgValue: "10000000000000000",
    // })

    // View Functions
    const { runContractFunction: getUserTotalValue} = useWeb3Contract({
        abi: abi,
        contractAddress: "0xCB157CA76f07F61988FfaFF272eb3BbAA8B94Bd6",
        functionName: "getUserTotalValue",
        params: {_user: "0xf81ee6A9CE219B296619e6332521ebC64A8B6C8E"},
    })

    const { 
        runContractFunction: getTokenValue
    } = useWeb3Contract({
        abi: abi,
        contractAddress: TOKEN_FARM_CONTRACT_ADDRESS,
        functionName: "getTokenValue",
        params: {_token: "0xb01B218f021E9151c61eCEA3173361BbbE9eA346"},
    })

    // This means that any time, any variable in here changes, run this function
    useEffect(() => {
        if(isWeb3Enabled){
            async function updateUI() {
                console.log(abi)
                console.log("Running userTotalValue()...")
                const userTotalValueFromCall = await getUserTotalValue()
                console.log("User total value returned: " + userTotalValueFromCall)
                setUserTotalValue(userTotalValueFromCall)
                if (userTotalValueFromCall == undefined) {
                    setUserTotalValue("{UNDEFINED}")
                }
                console.log("Running getTokenValue()...")
                const tokenValueFromCall = await getTokenValue()
                console.log("token value returned: " + tokenValueFromCall)
                setTokenValue(tokenValueFromCall.toString())
            }
            if (isWeb3Enabled) {
                updateUI()
            }
        }
    }, [isWeb3Enabled])

    return (
        <div>
            
            <div>
                <h4>
                    You have {userTotalValue} tokens staked
                    You have {tokenValue[0].toString()} token value
                </h4>
            </div>
            <button 
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={async () => {
                    await stakeTokens()
                }}
            >Stake Tokens</button>
        </div>
    )
}