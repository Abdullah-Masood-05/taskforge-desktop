import { Component } from "react";
import { ErrorState } from "@/components/ui/ErrorState";

/**
 * Catches render/runtime errors below it and shows the shared ErrorState UI.
 * "Try again" clears the error and re-renders the subtree.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  handleRetry() {
    this.setState({ error: null });
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorState
          error={this.state.error}
          onRetry={this.handleRetry}
          title={this.props.title}
        />
      );
    }
    return this.props.children;
  }
}
