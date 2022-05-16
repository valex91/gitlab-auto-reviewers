import { appendButtonToEdit } from './modules/appendButton';
import { get, KEY_ID } from '../../utils/storage'
import { Axios } from 'axios';
import icon from '../../assets/img/icon-34.png';

const HTTP = new Axios({
    baseURL: 'https://gitlab.com/api/v4',
    transformResponse: (data) => JSON.parse(data)
})

let isLoading = false;
const magicButton = document.createElement('button')

const action = async() => {
    const URLInfo = document.location.pathname.split('/')
    const projectName = URLInfo[4]
    const PRIID = URLInfo[URLInfo.length - 1]
    const APIKEY = await get(KEY_ID)

    isLoading = true;
    magicButton.classList.add('isLoading')
    const projectRes = (await HTTP.get(`projects?search=${projectName}`, {
        headers: {
            'PRIVATE-TOKEN': APIKEY,
        }
    })).data

    projectRes.flatMap((project) => project.shared_with_groups)

    const relevantUsersGroup = projectRes.flatMap((project) => project.shared_with_groups)
    const relevantUsers = await Promise.all(relevantUsersGroup.map((group) => HTTP.get(`groups/${group.group_id}/members`, {
        headers: {
            'PRIVATE-TOKEN': APIKEY,
        }
    }) ))
    const reviewers = relevantUsers.flatMap(res => res.data).map(user => user.id)
    
    const projectID = projectRes[0].id
    await HTTP.put(`/projects/${projectID}/merge_requests/${PRIID}?reviewer_ids=${reviewers.join(',')}`,null, {
        headers: {
            'PRIVATE-TOKEN': APIKEY,
            'content-type': 'application/json'
        },
    }, null)
    isLoading = false;
    document.location.reload()
}


magicButton.onclick = action
magicButton.disabled = isLoading
magicButton.type = 'button'
console.log(magicButton.style.backgroundImage, icon)
magicButton.classList.add('Gitlab-extension-autofill-button')


const mutationObs = new MutationObserver(() => {
    appendButtonToEdit(magicButton);
})

    const reviewersBlock = document.querySelector('.reviewer')

    mutationObs.observe(reviewersBlock, {childList: true})

