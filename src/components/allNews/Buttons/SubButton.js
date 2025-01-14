import { SNACKBAR_DURATION } from "../../../constants/index.js";
import store from "../../../core/Store.js";
import Icon from "../../common/Icon.js";

export default class SubButton {
  constructor(pressId) {
    this.$subButton = document.createElement("button");
    this.$plusIcon = new Icon({ name: "plus" });
    this.$text = document.createElement("span");
    this.$subButton.classList.add("pressInfo-subButton");

    this.$text.innerText = "구독하기";
    this.$subButton.appendChild(this.$plusIcon);
    this.$subButton.appendChild(this.$text);

    this.$subButton.addEventListener("click", () => {
      this.handleClickSubBtn(pressId);
    });

    return this.$subButton;
  }

  handleClickSubBtn(pressId) {
    const $gridWrapper = document.querySelector(".news-list-wrapper");
    const $listWrapper = document.querySelector(".list-container");
    const $snackBar = document.createElement("div");
    $snackBar.classList.add("snackBar-sub");
    $snackBar.innerText = "내가 구독한 언론사에 추가되었습니다.";
    if ($gridWrapper) $gridWrapper.appendChild($snackBar);
    if ($listWrapper) $listWrapper.appendChild($snackBar);

    store.addState(pressId);

    setTimeout(() => {
      if ($gridWrapper) $gridWrapper.removeChild($snackBar);
      if ($listWrapper) $listWrapper.removeChild($snackBar);

      // 리스트뷰에서 구독할 때
      if (!store.showState.isShowGrid && store.showState.isShowAllPress) {
        store.setShowState({ isShowAllPress: false, isShowGrid: false });
      }
    }, SNACKBAR_DURATION);
  }
}
