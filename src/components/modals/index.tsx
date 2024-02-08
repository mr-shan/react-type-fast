import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setModalVisibility  } from '../../store/features/appSettingReducer';

import InfoModel from './info';
import LeaderBoardModel from './leaderboard';
import SettingsModal from './settingsModal';

const ModalsWrapper = () => {
  const dispatch = useAppDispatch()
  const modalsState = useAppSelector(state => state.appSetting.modals);

  const onCloseModal = (event: string) => {
    dispatch(setModalVisibility({ key: event, value: false }))
  }
  return <>
    <InfoModel isOpen={modalsState.info} onClose={onCloseModal} />
    <LeaderBoardModel isOpen={modalsState.leaderBoard} onClose={onCloseModal} />
    <SettingsModal isOpen={modalsState.settings} onClose={onCloseModal} />
  </>
}

export default ModalsWrapper