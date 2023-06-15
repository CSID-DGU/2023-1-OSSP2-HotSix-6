import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // 오류가 발생하면 상태를 업데이트하여 오류 메시지를 숨깁니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 오류를 기록하거나 오류 리포팅 서비스에 전송할 수 있는 추가 로직을 실행할 수 있습니다.
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 오류가 발생한 경우에 대한 대체 UI를 렌더링합니다.
      return <div>오류가 발생했습니다.</div>;
    }

    // 오류가 없는 경우 자식 컴포넌트를 렌더링합니다.
    return this.props.children;
  }
}

export default ErrorBoundary;
