const BigNumber = require("bignumber.js");

class PendingReward {

    static displayName = "Staking unlock";
    static description = "Get notified when your staking position unlocked";

    // runs when class is initialized
    async onInit(args) {
        const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"withdrawalFee","type":"uint256"}],"name":"EarlyWithdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"withdrawalFee","type":"uint256"}],"name":"EmergencyWithdrawEarly","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"vRevaMultiplier","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timeLocked","type":"uint256"}],"name":"PoolAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"earlyWithdrawalFee","type":"uint256"}],"name":"SetEarlyWithdrawalFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"SetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"revaPerBlock","type":"uint256"}],"name":"SetRevaPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"VRevaBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"VRevaMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"EARLY_WITHDRAWAL_FEE_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_EARLY_WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accRevaFromFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accWithdrawnRevaFromFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_vRevaMultiplier","type":"uint256"},{"internalType":"uint256","name":"_timeLocked","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyWithdrawalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdrawEarly","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_revaToken","type":"address"},{"internalType":"address","name":"_vRevaToken","type":"address"},{"internalType":"address","name":"_revaFeeReceiver","type":"address"},{"internalType":"uint256","name":"_revaPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_earlyWithdrawalFee","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastUpdatedRevaFeesBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReva","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"vRevaMultiplier","type":"uint256"},{"internalType":"uint256","name":"timeLocked","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRevaPerShare","type":"uint256"},{"internalType":"uint256","name":"accRevaPerShareFromFees","type":"uint256"},{"internalType":"uint256","name":"lastAccRevaFromFees","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revaFeeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"revaPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"revaToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_earlyWithdrawalFee","type":"uint256"}],"name":"setEarlyWithdrawalFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_revaPerBlock","type":"uint256"}],"name":"setRevaPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userPoolInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"rewardFeeDebt","type":"uint256"},{"internalType":"uint256","name":"timeDeposited","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vRevaToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawEarly","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        this.contract = new args.web3.eth.Contract(abi, "0x8B7b2a115201ACd7F95d874D6A9432FcEB9C466A");
    }

    // runs right before user subscribes to new notifications and populates subscription form
    async onSubscribeForm(args) {
        const pools = await this._getAllUserPools(args);
        return [
            { type: "input-select", id: "pool", label: "Pool", values: pools },
        ];
    }

    async onBlocks(args) {
        const poolInfo = await this.contract.methods.poolInfo(args.subscription["pool"]).call();
        const userInfo = await this.contract.methods.userPoolInfo(args.subscription["pool"], args.address).call();

        const unlockWithinDays = Math.max(0, Math.ceil((parseInt(userInfo.timeDeposited) + parseInt(poolInfo.timeLocked) - (new Date().getTime() / 1000)) / 24 / 60 / 60));
        const unlockWithinWeeks = Math.floor(unlockWithinDays / 7);
        const unlockWithinMonths = Math.floor(unlockWithinDays / 30);

        if (unlockWithinMonths > 0) {
            return [
                {
                    notification: `Your X${poolInfo.vRevaMultiplier} staking position will be unlock in ${unlockWithinMonths} ${unlockWithinMonths === 1 ? 'month' : 'months'}`
                }
            ];
        } else if (unlockWithinWeeks > 0) {
            return [
                {
                    notification: `Your X${poolInfo.vRevaMultiplier} staking position will be unlock in ${unlockWithinWeeks} ${unlockWithinWeeks === 1 ? 'week' : 'weeks'}`
                }
            ];
        } else if (unlockWithinDays > 0) {
            return [
                {
                    notification: `Your X${poolInfo.vRevaMultiplier} staking position will be unlock in ${unlockWithinDays} ${unlockWithinDays === 1 ? 'day' : 'days'}`
                }
            ];
        } else {
            return [
                {
                    notification: `Your X${poolInfo.vRevaMultiplier} staking position is unlocked, go to app.revault.network to restake`
                }
            ];
        }

    }

    async _getAllUserPools(args) {
        const pools = [];
        const poolLength = await this.contract.methods.poolLength().call();
        for (let pid = 0; pid < poolLength; pid++) {
            const userInfo = await this.contract.methods.userPoolInfo(pid, args.address).call();
            if (parseInt(userInfo.amount) > 0) {
                const poolInfo = await this.contract.methods.poolInfo(pid).call();
                pools.push({
                    value: pid,
                    label: `X${poolInfo.vRevaMultiplier} ${parseInt(poolInfo.timeLocked) / 24 / 60 / 60} Days Lock`
                });
            }
        }
        return pools;
    }

}

module.exports = PendingReward;
